<?php


namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin')->except('activate_license', 'install', 'test_database_connection');
    }
    public function index()
    {
        return view('pages.admin.settings');
    }
    public function setServer(Request $request)
    {
        $request->validate([
            'typeServer' => ['required'],
            'portnode' => ['required'],
            'urlnode' => ['required_if:typeServer,other', 'nullable', 'url'],
        ]);

        $urlnode = $request->typeServer === 'other' ? $request->urlnode . ':' . $request->portnode : ($request->typeServer === 'hosting' ? url('/') : 'http://localhost:' . $request->portnode);
        setEnv('TYPE_SERVER', $request->typeServer);
        setEnv('PORT_NODE', $request->portnode);
        setEnv('WA_URL_SERVER', $urlnode);
        return back()->with('alert', ['type' => 'success', 'msg' => 'Success Update configuration!',]);
    }
    public function activate_license(Request $request)
    {
        try {
            $push = Http::withOptions(['verify' => false])->asForm()->post(
                'google.com',
                [
                    'email' => $request->email,
                    'host' => $_SERVER['HTTP_HOST'],
                    'licensekey' => $request->license,
                ]
            );
            return json_decode($push);
        } catch (\Throwable $th) {
            return false;
        }
    }

    public function test_database_connection(Request $request)
    {
        $data = json_decode(json_encode($request->database));
        $error_message = null;
        try {
            // Manejar contraseña nula, vacía o string 'null'
            $password = $data->password ?? '';
            if (is_null($password) || $password === 'null' || $password === '' || $password === 'undefined') {
                $password = '';
            }

            $db = new \mysqli($data->host, $data->username, $password, $data->database);
            $error_message = $db->connect_errno ? 'Connection Failed .' . $db->connect_error : $error_message;
        } catch (\Throwable $th) {
            $error_message = $th->getMessage();
            Log::error('Database connection error: ' . $th->getMessage());
            // $error_message = 'Connection failed';
        }
        return response()->json(['status' => $error_message ?? 'Success', 'error' => $error_message === null ? false : true,]);
    }

    public function install(Request $request)
    {
        // Log crítico para detectar llegada de requests
        file_put_contents(storage_path('logs/install_debug.log'), 
            date('Y-m-d H:i:s') . " - Method: " . $request->method() . 
            " - URL: " . $request->fullUrl() . 
            " - IP: " . $request->ip() . 
            " - User Agent: " . $request->header('User-Agent') . "\n", 
            FILE_APPEND
        );
        
        // Debug log para rastrear el problema
        Log::info('Install method called', [
            'method' => $request->method(),
            'url' => $request->url(),
            'fullUrl' => $request->fullUrl(),
            'headers' => $request->headers->all(),
            'app_installed' => env('APP_INSTALLED')
        ]);
        
        if (env('APP_INSTALLED') === true) {
            Log::info('App already installed, redirecting to home');
            return redirect('/');
        }
        
        if ($request->method() === 'POST') {
            Log::info('Processing POST request for installation');
            $request->validate([
                'database.host' => 'string|required',
                'database.username' => 'string|required',
                'database.password' => 'string|nullable',
                'database.database' => 'string|required',
                //'licensekey' => 'required', 
                //'buyeremail' =>'required|email', 
                'admin.username' => 'required',
                'admin.email' => 'required|email',
                'admin.password' => 'required|max:255',
            ]);
            /** CREATE DATABASE CONNECTION STARTS **/
            $db_params = $request->input('database');

            // Manejar contraseña nula, vacía o string 'null'
            $password = $db_params['password'] ?? '';
            if (is_null($password) || $password === 'null' || $password === '' || $password === 'undefined') {
                $password = '';
            }
            $db_params['password'] = $password;

            Config::set(
                'database.connections.mysql',
                array_merge(config('database.connections.mysql'), $db_params)
            );

            try {
                DB::connection()->getPdo();
            } catch (\Exception $e) {
                Log::error($e->getMessage());
                Log::info('error: ' . $e->getMessage());
                $validator = Validator::make($request->all(), [])->errors()->add('Database', $e->getMessage());
                return back()->withErrors($validator)->withInput();
            }
            /** CREATE DATABASE CONNECTION ENDS **/
            try {
                // delete old tables 
                DB::transaction(function () {
                    DB::unprepared(File::get(base_path('database/db_tables.sql')));
                });
                // cache clear artisan 
                Artisan::call('cache:clear');
            } catch (\Throwable $th) {
                Artisan::call('migrate:fresh', ['--force' => true,]);
            }
            /** SETTING .ENV VARS STARTS **/

            if (isset($_SERVER['REQUEST_SCHEME'])) {
                $urll = "{$_SERVER['REQUEST_SCHEME']}://{$_SERVER['HTTP_HOST']}";
            } else {

                $urll = $_SERVER['HTTP_HOST'];
            }
            $env['DB_HOST'] = $db_params['host'];
            $env['DB_DATABASE'] = $db_params['database'];
            $env['DB_USERNAME'] = $db_params['username'];
            $env['DB_PASSWORD'] = $db_params['password'];
            $env['APP_URL'] = $urll;
            $env['APP_INSTALLED'] = 'true';

            if ($request->input('licensekey') != null) {
                $env['LICENSE_KEY'] = $request->input('licensekey');
            }
            if ($request->input('buyeremail') != null) {
                $env['BUYER_EMAIL'] = $request->input('buyeremail');
            }

            foreach ($env as $k => &$v) {
                setEnv($k, $v);
            }
            /** SETTING .ENV VARS ENDS **/
            /** CREATE ADMIN USER STARTS **/
            if (!($user = User::where('email', $request->input('admin.email'))->first())) {
                $user = new User();
                $user->username = $request->input('admin.username');
                $user->email = $request->input('admin.email');
                $user->password = Hash::make($request->input('admin.password'));
                $user->email_verified_at = date('Y-m-d');
                $user->level = 'admin';
                $user->active_subscription = 'lifetime';
                $user->limit_device = 10;
                $user->chunk_blast = 0;
                $user->save();
            }
            /** CREATE ADMIN USER END **/
            Auth::loginUsingId($user->id, true);
            return redirect()->route('home');
        }
        // get method 
        $mysql_user_version = ['distrib' => 'mysql', 'version' => null, 'compatible' => false,];

        // Método 1: Intentar obtener versión usando la configuración de Laravel
        try {
            // Intentar usar la conexión de Laravel si ya está configurada
            if (config('database.connections.mysql.host')) {
                $version = \DB::connection('mysql')->select('SELECT VERSION() as version')[0]->version;
            } else {
                // Fallback usando credenciales del .env
                $db_host = env('DB_HOST', 'localhost');
                $db_port = env('DB_PORT', '3306');
                $db_username = env('DB_USERNAME', 'root');
                $db_password = env('DB_PASSWORD', '');

                $dsn = "mysql:host={$db_host};port={$db_port}";
                $pdo = new \PDO($dsn, $db_username, $db_password);
                $version = $pdo->query('SELECT VERSION()')->fetchColumn();
            }

            if ($version) {
                // Extraer versión numérica (ej: "8.0.43-0ubuntu0.22.04.1" -> "8.0.43")
                if (preg_match('/^(\d+\.\d+(?:\.\d+)?)/', $version, $matches)) {
                    $mysql_user_version['version'] = $matches[1];
                    $mysql_user_version['distrib'] = (stripos($version, 'mariadb') !== false) ? 'mariadb' : 'mysql';

                    // Verificar compatibilidad según el tipo de base de datos
                    if ($mysql_user_version['distrib'] == 'mysql') {
                        $mysql_user_version['compatible'] = version_compare($mysql_user_version['version'], '5.6', '>=');
                    } else {
                        $mysql_user_version['compatible'] = version_compare($mysql_user_version['version'], '10.0', '>=');
                    }
                }
            }
        } catch (\Exception $e) {
            // Si falla la conexión directa, intentar con comandos del sistema
            if (function_exists('exec') || function_exists('shell_exec')) {
                // Intentar mysql --version primero
                $mysql_v = function_exists('exec') ? exec('mysql --version 2>/dev/null') : shell_exec('mysql --version 2>/dev/null');

                if (!$mysql_v) {
                    // Fallback a mysqldump --version
                    $mysql_v = function_exists('exec') ? exec('mysqldump --version 2>/dev/null') : shell_exec('mysqldump --version 2>/dev/null');
                }

                if ($mysql_v && preg_match('/(\d+\.\d+(?:\.\d+)?)/', $mysql_v, $matches)) {
                    $mysql_user_version['version'] = $matches[1];
                    $mysql_user_version['distrib'] = (stripos($mysql_v, 'mariadb') !== false) ? 'mariadb' : 'mysql';

                    if ($mysql_user_version['distrib'] == 'mysql' && version_compare($mysql_user_version['version'], '5.6', '>=')) {
                        $mysql_user_version['compatible'] = true;
                    } elseif ($mysql_user_version['distrib'] == 'mariadb' && version_compare($mysql_user_version['version'], '10.0', '>=')) {
                        $mysql_user_version['compatible'] = true;
                    }
                }
            }

            // Si nada funciona, asumir compatible para permitir continuar la instalación
            if (!$mysql_user_version['version']) {
                $mysql_user_version['version'] = 'Desconocida';
                $mysql_user_version['compatible'] = true; // Permitir continuar
            }
        }
        $requirements = [
            'php' => [
                'version' => "8.0",
                'current' => phpversion()
            ],
            'mysql' => [
                'version' => 5.6,
                'current' => $mysql_user_version
            ],
            'php_extensions' => [
                'curl' => false,
                'fileinfo' => false,
                'intl' => false,
                'json' => false,
                'mbstring' => false,
                'openssl' => false,
                'mysqli' => false,
                'zip' => false,
                'ctype' => false,
                'dom' => false,
            ],
        ];

        $php_loaded_extensions = get_loaded_extensions();
        foreach ($requirements['php_extensions'] as $name => &$enabled) {
            $enabled = in_array($name, $php_loaded_extensions);
        }
        return view('install', ['requirements' => $requirements,]);
    }
}
