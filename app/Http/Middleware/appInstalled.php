<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class appInstalled
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
    // Debug para ver qué ruta se está ejecutando
    $routeName = $request->route() ? $request->route()->getName() : 'NO_ROUTE';
    file_put_contents(
      storage_path('logs/middleware_debug.log'),
      date('Y-m-d H:i:s') . " - Route: " . $routeName .
        " - URL: " . $request->fullUrl() .
        " - Method: " . $request->method() .
        " - APP_INSTALLED: " . (env('APP_INSTALLED') ? 'true' : 'false') . "\n",
      FILE_APPEND
    );

    $allowedRoute = ['setting.install_app', 'activateLicense', 'connectDB', 'settings.install_app', "cache.clear"];
    if (!in_array($routeName, $allowedRoute) && !env('APP_INSTALLED')) {
      file_put_contents(
        storage_path('logs/middleware_debug.log'),
        date('Y-m-d H:i:s') . " - REDIRECTING! Route '$routeName' not in allowed routes\n",
        FILE_APPEND
      );
      return redirect()->route('setting.install_app');
    }
    return $next($request);
  }
}
