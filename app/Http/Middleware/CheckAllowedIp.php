<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAllowedIp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Obtener IPs y dominios permitidos desde .env
        $allowedIps = explode(',', env('ALLOWED_IPS', ''));
        $allowedDomains = explode(',', env('ALLOWED_DOMAINS', ''));

        // Limpiar espacios en blanco
        $allowedIps = array_map('trim', $allowedIps);
        $allowedDomains = array_map('trim', $allowedDomains);

        // Obtener IP del cliente
        $clientIp = $request->ip();

        // Obtener IP real si está detrás de proxy (Cloudflare, nginx, etc.)
        if ($request->header('X-Forwarded-For')) {
            $forwardedIps = explode(',', $request->header('X-Forwarded-For'));
            $clientIp = trim($forwardedIps[0]);
        } elseif ($request->header('X-Real-IP')) {
            $clientIp = $request->header('X-Real-IP');
        }

        // Verificar si la IP está en la lista de IPs permitidas
        if (in_array($clientIp, $allowedIps)) {
            return $next($request);
        }

        // Verificar si el origen coincide con algún dominio permitido
        $origin = $request->header('Origin') ?? $request->header('Referer');
        if ($origin) {
            $parsedUrl = parse_url($origin);
            $host = $parsedUrl['host'] ?? '';

            foreach ($allowedDomains as $domain) {
                if (!empty($domain) && (strcasecmp($host, $domain) === 0 || str_ends_with($host, '.' . $domain))) {
                    return $next($request);
                }
            }
        }

        // Si no está autorizado, retornar error 403
        return response()->json([
            'status' => false,
            'message' => 'Acceso denegado. IP no autorizada.',
            'ip' => $clientIp
        ], 403);
    }
}
