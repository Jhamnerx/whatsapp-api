<?php

namespace App\Http\Middleware;

use App\Models\Device;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CheckApiKey
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
        try {
            // Buscar directamente el device por api_key
            $device = Device::whereApiKey($request->api_key)->first();

            if (!$device) {
                return response()->json(
                    [
                        'status' => false,
                        'msg' => 'Invalid data!',
                        'errors' => 'Invalid api_key, please check again',
                    ],
                    Response::HTTP_BAD_REQUEST
                );
            }

            // Verificar que el sender coincida con el body del device
            if ($device->body != $request->sender) {
                return response()->json(
                    [
                        'status' => false,
                        'msg' => 'Invalid data!',
                        'errors' => 'Invalid sender for this api_key, please check again',
                    ],
                    Response::HTTP_BAD_REQUEST
                );
            }

            // Verificar suscripción del usuario
            $user = $device->user;
            if ($user->isExpiredSubscription) {
                return response()->json(
                    [
                        'status' => false,
                        'msg' => 'Subscription expired!',
                        'errors' => 'Your subscription has expired, please renew your subscription',
                    ],
                    Response::HTTP_BAD_REQUEST
                );
            }

            return $next($request);
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'status' => false,
                    'msg' => 'Invalid data!',
                    'errors' => 'Invalid api_key or sender, please check again',
                ],
                Response::HTTP_BAD_REQUEST
            );
        }
    }
}
