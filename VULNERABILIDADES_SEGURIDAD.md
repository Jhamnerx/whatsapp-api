# 🚨 REPORTE DE VULNERABILIDADES DE SEGURIDAD - Sistema de Autenticación

## ⚠️ VULNERABILIDADES CRÍTICAS ENCONTRADAS

### 1. **API Keys Expuestos en el Frontend (CRÍTICO)**

**Ubicación:** `resources/views/home.blade.php` línea 140

```blade
<input type="password" id="apikey-{{ $number['id'] }}"
    class="form-control form-control-sm"
    value="{{ $number['api_key'] }}" readonly>
```

**Problema:**

- ✅ El API key se muestra directamente en el HTML (aunque como password)
- ❌ **Cualquier persona con acceso al navegador puede ver el código fuente y extraer TODOS los API keys**
- ❌ Los API keys están en el DOM y pueden ser extraídos con JavaScript en la consola del navegador
- ❌ Las herramientas de desarrollo del navegador (F12) revelan todos los valores

**Cómo lo obtuvieron:**

```javascript
// En la consola del navegador (F12):
document.querySelectorAll('[id^="apikey-"]').forEach((input) => {
  console.log(input.value);
});
// Esto revela TODOS los API keys de todos los devices
```

**Impacto:** 🔴 CRÍTICO

- Cualquier usuario autenticado puede ver los API keys de TODOS sus devices
- Si un atacante obtiene acceso a una sesión, puede robar todos los tokens
- Los API keys quedan en el historial del navegador
- Los API keys pueden ser capturados por extensiones maliciosas del navegador

---

### 2. **Falta de Rate Limiting en API (CRÍTICO)**

**Ubicación:** `app/Http/Middleware/CheckApiKey.php`

**Problema:**

- ❌ No hay límite de intentos de autenticación
- ❌ Un atacante puede hacer fuerza bruta para adivinar API keys
- ❌ No hay throttling en las rutas de API

**Impacto:** 🔴 CRÍTICO

- Ataques de fuerza bruta ilimitados
- Posible DDoS por abuso de API
- Sin registro de intentos fallidos

---

### 3. **API Keys Generados con Baja Entropía (ALTO)**

**Ubicación:** `app/Http/Controllers/HomeController.php` línea 53

```php
'api_key' => Str::random(32)
```

**Problema:**

- ⚠️ `Str::random(32)` usa caracteres alfanuméricos (a-z, A-Z, 0-9) = 62 caracteres posibles
- ⚠️ Para 32 caracteres: 62^32 ≈ 2.27 × 10^57 combinaciones (aceptable pero mejorable)
- ❌ No hay timestamp ni información única del usuario

**Mejora Recomendada:**

- Usar hash criptográfico con más entropía
- Incluir timestamp, user_id, y salt único

---

### 4. **Sin Expiración de API Keys (ALTO)**

**Problema:**

- ❌ Los API keys nunca expiran
- ❌ Si un key es comprometido, es válido para siempre
- ❌ No hay rotación automática de keys

**Impacto:** 🟠 ALTO

- Keys robados funcionan indefinidamente
- Sin mecanismo de revocación automática
- Sin auditoría de uso de keys antiguos

---

### 5. **Sin Logging de Accesos con API Key (ALTO)**

**Problema:**

- ❌ No se registra quién usa cada API key
- ❌ No se registra desde qué IP se usa
- ❌ No se detectan usos anormales

**Impacto:** 🟠 ALTO

- Imposible detectar uso no autorizado
- Sin trazabilidad de ataques
- No se puede auditar el uso de la API

---

### 6. **Regeneración de API Key Sin Autenticación Adicional (MEDIO)**

**Ubicación:** `routes/web.php` línea 39

```php
Route::post('/home/regenerate-device-api-key', [HomeController::class, 'regenerateDeviceApiKey'])
```

**Problema:**

- ⚠️ Solo requiere estar autenticado, sin verificación adicional
- ⚠️ No requiere contraseña actual
- ⚠️ No hay confirmación por email
- ⚠️ No hay notificación de cambio de API key

**Impacto:** 🟡 MEDIO

- Si una sesión es comprometida, el atacante puede regenerar keys
- Sin alertas al usuario legítimo

---

### 7. **CORS y Headers de Seguridad (MEDIO)**

**Problema:**

- ⚠️ No se verifican los headers de seguridad en requests API
- ⚠️ Posible explotación vía CSRF en rutas API

---

## 🛡️ SOLUCIONES INMEDIATAS

### Solución 1: Nunca Mostrar API Keys Completos en Frontend

**Implementar sistema de "mostrar parcialmente":**

```blade
<!-- En lugar de mostrar el API key completo -->
<input type="text"
    value="{{ substr($number['api_key'], 0, 8) }}...{{ substr($number['api_key'], -4) }}"
    readonly>
<!-- Ejemplo: "a1b2c3d4...xyz9" -->
```

**Y agregar botón "Revelar API Key" con modal de confirmación:**

```blade
<button onclick="revealApiKey({{ $number['id'] }})"
    class="btn btn-sm btn-warning">
    Revelar API Key Completo
</button>

<!-- Modal con confirmación -->
<div class="modal" id="revealApiKeyModal-{{ $number['id'] }}">
    <p>⚠️ ¿Estás seguro? El API Key solo se mostrará una vez.</p>
    <input type="password" placeholder="Ingresa tu contraseña">
    <button onclick="confirmReveal()">Confirmar</button>
</div>
```

---

### Solución 2: Implementar Rate Limiting

**Crear middleware para rate limiting:**

```php
// app/Http/Middleware/ThrottleApiRequests.php
public function handle(Request $request, Closure $next)
{
    $key = 'api_throttle_' . $request->ip() . '_' . ($request->api_key ?? 'unknown');

    if (Cache::has($key) && Cache::get($key) >= 100) {
        return response()->json([
            'status' => false,
            'message' => 'Too many requests. Please try again later.'
        ], 429);
    }

    Cache::increment($key, 1);
    Cache::put($key, Cache::get($key, 0), now()->addMinutes(1));

    return $next($request);
}
```

**Aplicar en routes/api.php:**

```php
Route::middleware(['throttle:api', 'checkApiKey', 'checkAllowedIp'])->group(function () {
    // ... rutas protegidas
});
```

---

### Solución 3: Mejorar Generación de API Keys

**Usar hash criptográfico fuerte:**

```php
public function generateSecureApiKey($userId, $deviceId)
{
    $timestamp = now()->timestamp;
    $random = bin2hex(random_bytes(32)); // 64 caracteres hex
    $salt = config('app.key');

    return hash('sha256',
        $userId .
        $deviceId .
        $timestamp .
        $random .
        $salt
    );
}
```

---

### Solución 4: Implementar Expiración de API Keys

**Agregar columna de expiración:**

```php
// Migration
Schema::table('devices', function (Blueprint $table) {
    $table->timestamp('api_key_expires_at')->nullable();
    $table->timestamp('api_key_last_used_at')->nullable();
});
```

**Validar en middleware:**

```php
if ($device->api_key_expires_at && $device->api_key_expires_at < now()) {
    return response()->json([
        'status' => false,
        'message' => 'API key has expired. Please regenerate.'
    ], 401);
}

// Actualizar último uso
$device->update(['api_key_last_used_at' => now()]);
```

---

### Solución 5: Implementar Logging de Accesos

**Crear tabla de logs:**

```php
// Migration
Schema::create('api_access_logs', function (Blueprint $table) {
    $table->id();
    $table->foreignId('device_id')->constrained()->onDelete('cascade');
    $table->string('ip_address');
    $table->string('endpoint');
    $table->string('method');
    $table->json('headers')->nullable();
    $table->boolean('success');
    $table->text('error_message')->nullable();
    $table->timestamps();

    $table->index(['device_id', 'created_at']);
    $table->index('ip_address');
});
```

**Middleware de logging:**

```php
public function handle(Request $request, Closure $next)
{
    $device = Device::whereApiKey($request->api_key)->first();

    $logData = [
        'device_id' => $device->id ?? null,
        'ip_address' => $request->ip(),
        'endpoint' => $request->path(),
        'method' => $request->method(),
        'headers' => json_encode($request->headers->all()),
        'success' => true,
        'created_at' => now(),
    ];

    try {
        $response = $next($request);
        $logData['success'] = $response->getStatusCode() < 400;
        return $response;
    } catch (\Exception $e) {
        $logData['success'] = false;
        $logData['error_message'] = $e->getMessage();
        throw $e;
    } finally {
        DB::table('api_access_logs')->insert($logData);
    }
}
```

---

### Solución 6: Autenticación Adicional para Regenerar Keys

```php
public function regenerateDeviceApiKey(Request $request)
{
    $validated = $request->validate([
        'deviceId' => 'required|exists:devices,id',
        'password' => 'required', // Requerir contraseña
    ]);

    // Verificar contraseña del usuario
    if (!Hash::check($request->password, $request->user()->password)) {
        return back()->with('alert', [
            'type' => 'danger',
            'msg' => 'Contraseña incorrecta'
        ]);
    }

    $device = $request->user()->devices()->find($request->deviceId);

    // Guardar old key para logs
    $oldKey = $device->api_key;

    $newApiKey = $this->generateSecureApiKey(
        $request->user()->id,
        $device->id
    );

    $device->update([
        'api_key' => $newApiKey,
        'api_key_expires_at' => now()->addMonths(6), // 6 meses
    ]);

    // Registrar cambio
    activity()
        ->performedOn($device)
        ->log('API key regenerated. Old key: ' . substr($oldKey, 0, 8) . '...');

    // Enviar email de notificación
    Mail::to($request->user()->email)->send(
        new ApiKeyRegeneratedMail($device)
    );

    return back()->with('alert', [
        'type' => 'success',
        'msg' => 'API Key regenerado. Verifica tu email.'
    ]);
}
```

---

## 🔒 SOLUCIONES ADICIONALES RECOMENDADAS

### 1. **Implementar API Key Scopes (Permisos)**

```php
// Migration
Schema::table('devices', function (Blueprint $table) {
    $table->json('api_key_scopes')->default('["send_message", "send_media"]');
});

// Middleware
if (!in_array($request->route()->getName(), $device->api_key_scopes)) {
    return response()->json([
        'status' => false,
        'message' => 'API key does not have permission for this action'
    ], 403);
}
```

---

### 2. **Implementar Webhook Signatures**

```php
// Firmar webhooks para verificar origen
$signature = hash_hmac('sha256', $payload, $device->webhook_secret);
$headers = [
    'X-Webhook-Signature' => $signature,
    'X-Webhook-Timestamp' => time(),
];
```

---

### 3. **Implementar 2FA para Acciones Críticas**

- Requerir código 2FA para regenerar API keys
- Requerir 2FA para cambiar webhooks
- Requerir 2FA para eliminar devices

---

### 4. **Auditoría y Alertas**

```php
// Detectar uso sospechoso
if ($device->api_key_last_used_at->diffInMinutes(now()) < 1 &&
    $lastIp != $request->ip()) {

    // Alerta: Mismo API key usado desde 2 IPs diferentes en menos de 1 minuto
    Mail::to($device->user->email)->send(
        new SuspiciousActivityAlert($device, $request->ip())
    );
}
```

---

## 📊 PRIORIDAD DE IMPLEMENTACIÓN

### 🔴 **URGENTE (Implementar HOY)**

1. ✅ Dejar de mostrar API keys completos en frontend
2. ✅ Implementar rate limiting
3. ✅ Implementar logging de accesos

### 🟠 **ALTA (Implementar esta semana)**

4. ✅ Mejorar generación de API keys
5. ✅ Implementar expiración de keys
6. ✅ Requerir contraseña para regenerar keys

### 🟡 **MEDIA (Implementar este mes)**

7. ✅ Implementar API key scopes
8. ✅ Implementar webhook signatures
9. ✅ Implementar 2FA para acciones críticas

---

## 🧪 CÓMO VERIFICAR SI TE HACKEARON

### Revisar Logs de Laravel

```bash
tail -f storage/logs/laravel.log | grep "api_key"
```

### Buscar Accesos Sospechosos

```sql
-- Si implementas api_access_logs
SELECT
    device_id,
    ip_address,
    COUNT(*) as requests,
    MIN(created_at) as first_access,
    MAX(created_at) as last_access
FROM api_access_logs
WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY device_id, ip_address
HAVING requests > 1000; -- Más de 1000 requests en 7 días
```

### Revisar Devices con Actividad Anormal

```sql
SELECT
    d.id,
    d.body,
    d.message_sent,
    d.api_key,
    d.created_at,
    u.email
FROM devices d
JOIN users u ON d.user_id = u.id
WHERE d.message_sent > 10000 -- Más de 10k mensajes
   OR d.created_at > DATE_SUB(NOW(), INTERVAL 1 DAY); -- Devices nuevos
```

---

## 📞 ACCIONES INMEDIATAS SI FUE COMPROMETIDO

1. **Regenerar TODOS los API keys inmediatamente**
2. **Revisar todos los webhooks configurados**
3. **Verificar mensajes enviados en las últimas 24h**
4. **Cambiar contraseñas de usuarios afectados**
5. **Implementar las soluciones de seguridad URGENTES**
6. **Notificar a usuarios afectados**
7. **Revisar logs del servidor (Apache/Nginx)**

---

## 🔐 CONFIGURACIÓN DE SEGURIDAD ADICIONAL

### Apache/Nginx - Bloquear Bots Maliciosos

```apache
# .htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTP_USER_AGENT} (bot|crawler|spider) [NC]
    RewriteRule .* - [F,L]
</IfModule>
```

### Headers de Seguridad

```php
// app/Http/Middleware/SecurityHeaders.php
public function handle($request, Closure $next)
{
    $response = $next($request);

    $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
    $response->headers->set('X-Content-Type-Options', 'nosniff');
    $response->headers->set('X-XSS-Protection', '1; mode=block');
    $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    return $response;
}
```

---

**⚠️ ACCIÓN REQUERIDA: Implementar las soluciones URGENTES antes de 24 horas.**

---

**Fecha del reporte:** 25 de noviembre de 2025  
**Nivel de riesgo actual:** 🔴 CRÍTICO  
**Nivel de riesgo después de implementar:** 🟢 BAJO
