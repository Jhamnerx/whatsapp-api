<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ClearInstallationCache extends Command
{
    protected $signature = 'install:clear';
    protected $description = 'Limpiar cache y datos conflictivos para una instalación limpia';

    public function handle()
    {
        $this->info('🧹 Limpiando cache y datos para instalación...');

        // Limpiar cache de Laravel
        $this->call('cache:clear');
        $this->call('config:clear');
        $this->call('route:clear');
        $this->call('view:clear');

        // Limpiar sesiones si existe el directorio
        $sessionPath = storage_path('framework/sessions');
        if (File::exists($sessionPath)) {
            File::cleanDirectory($sessionPath);
            $this->info('✅ Sesiones limpiadas');
        }

        // Limpiar logs de instalación si existen
        $installLogPath = storage_path('logs/install_debug.log');
        if (File::exists($installLogPath)) {
            File::delete($installLogPath);
            $this->info('✅ Logs de instalación limpiados');
        }

        // Verificar permisos
        $this->info('🔒 Verificando permisos...');

        $storagePath = storage_path();
        $bootstrapPath = base_path('bootstrap/cache');

        if (is_writable($storagePath) && is_writable($bootstrapPath)) {
            $this->info('✅ Permisos correctos');
        } else {
            $this->warn('⚠️  Algunos directorios no tienen permisos de escritura');
            $this->line('Ejecuta: sudo chmod -R 775 storage bootstrap/cache');
        }

        $this->info('🎉 Limpieza completada. Ahora puedes acceder a /install');

        return 0;
    }
}
