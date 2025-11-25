# 🔒 Configuración de Protección por IP/Dominio

## ✅ Implementación Completada

Se ha implementado un sistema de protección para las rutas de la API que solo permite el acceso desde IPs y dominios autorizados.

---

## 📋 Archivos Modificados

### 1. **Middleware Creado**

- `app/Http/Middleware/CheckAllowedIp.php` - Valida IPs y dominios permitidos

### 2. **Rutas Protegidas**

- `routes/api.php` - Rutas protegidas con middleware `checkAllowedIp`

### 3. **Kernel Actualizado**

- `app/Http/Kernel.php` - Middleware registrado

### 4. **Configuración**

- `.env` - Variables de configuración agregadas

---

## ⚙️ Configuración en `.env`

Abre tu archivo `.env` y configura las IPs y dominios permitidos:

```env
# IPs y dominios permitidos para acceder a la API (separados por comas)
ALLOWED_IPS=123.456.789.012,192.168.1.100,127.0.0.1
ALLOWED_DOMAINS=tudominio.com,otrositio.com
```

### 📝 **Ejemplos de Configuración**

#### Ejemplo 1: Solo IP del VPS

```env
ALLOWED_IPS=45.76.123.45
ALLOWED_DOMAINS=
```

#### Ejemplo 2: IP y Dominio del VPS

```env
ALLOWED_IPS=45.76.123.45,192.168.1.100
ALLOWED_DOMAINS=pegasus.synthesisgroup.pe
```

#### Ejemplo 3: Múltiples IPs y Dominios

```env
ALLOWED_IPS=45.76.123.45,192.168.1.100,127.0.0.1
ALLOWED_DOMAINS=pegasus.synthesisgroup.pe,app.midominio.com
```

#### Ejemplo 4: Solo desarrollo local (para pruebas)

```env
ALLOWED_IPS=127.0.0.1,::1
ALLOWED_DOMAINS=localhost
```

---

## 🔧 Cómo Funciona

### 1. **Validación de IP**

El middleware verifica que la IP del cliente esté en la lista `ALLOWED_IPS`:

- Obtiene la IP real del cliente
- Considera headers de proxy (`X-Forwarded-For`, `X-Real-IP`)
- Compara con la lista de IPs permitidas

### 2. **Validación de Dominio**

Si la IP no coincide, verifica el dominio de origen:

- Lee los headers `Origin` o `Referer`
- Extrae el dominio de la URL
- Compara con la lista de dominios permitidos

### 3. **Respuesta de Error**

Si no está autorizado, retorna:

```json
{
  "status": false,
  "message": "Acceso denegado. IP no autorizada.",
  "ip": "123.456.789.012"
}
```

Con código HTTP **403 Forbidden**

---

## 🛡️ Rutas Protegidas

Las siguientes rutas están protegidas con validación de IP:

```
POST/GET /api/send-message
POST/GET /api/send-media
POST/GET /api/send-button
POST/GET /api/send-template
POST/GET /api/send-list
```

### ⚠️ Rutas NO Protegidas

La ruta de generación de QR **NO** está protegida:

```
POST /api/generate-qr
```

---

## 🧪 Pruebas

### Prueba 1: Desde IP Autorizada

```bash
# Desde tu VPS autorizado
curl -X POST https://tu-api.com/api/send-message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_API_KEY" \
  -d '{"sender":"56967885120","number":"56912345678","message":"Test"}'
```

**Resultado esperado:** ✅ Mensaje enviado correctamente

### Prueba 2: Desde IP No Autorizada

```bash
# Desde otra IP
curl -X POST https://tu-api.com/api/send-message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_API_KEY" \
  -d '{"sender":"56967885120","number":"56912345678","message":"Test"}'
```

**Resultado esperado:** ❌ HTTP 403 con mensaje de acceso denegado

---

## 🔍 Obtener tu IP del VPS

### Desde el VPS:

```bash
# Opción 1: Con curl
curl ifconfig.me

# Opción 2: Con wget
wget -qO- ifconfig.me

# Opción 3: IP pública
curl ipinfo.io/ip

# Opción 4: IP local
hostname -I
```

### Desde tu aplicación PHP (Laravel):

```php
// En tu controlador
$clientIp = request()->ip();
dd($clientIp);
```

---

## 📝 Logs y Debugging

### Ver IP del cliente en logs de Laravel:

```php
// Agregar en el middleware o controlador
\Log::info('Client IP: ' . $request->ip());
\Log::info('X-Forwarded-For: ' . $request->header('X-Forwarded-For'));
\Log::info('X-Real-IP: ' . $request->header('X-Real-IP'));
```

### Ver logs:

```bash
tail -f storage/logs/laravel.log
```

---

## ⚡ Aplicar Cambios

Después de modificar `.env`:

```bash
# Limpiar cache de configuración
php artisan config:clear
php artisan cache:clear

# O si usas PM2 para Node.js
pm2 restart whatsapp-api
```

---

## 🔐 Consideraciones de Seguridad

### ✅ **Recomendaciones:**

1. **Usa HTTPS**: Siempre en producción
2. **IP Estática**: Asegúrate de que tu VPS tenga IP estática
3. **Firewall**: Configura firewall en el servidor también
4. **Logs**: Monitorea intentos de acceso no autorizados
5. **API Key**: Mantén ambas protecciones (IP + API Key)

### ⚠️ **Advertencias:**

- Si usas Cloudflare, considera las IPs de Cloudflare
- Si tu VPS está detrás de proxy, verifica headers de proxy
- Las IPs dinámicas cambiarán y deberás actualizar `.env`

---

## 🛠️ Desactivar Protección (Solo para desarrollo)

Si necesitas desactivar temporalmente la protección:

### Opción 1: Permitir todas las IPs

```env
ALLOWED_IPS=0.0.0.0
```

### Opción 2: Comentar el middleware en routes/api.php

```php
// Cambiar de:
Route::middleware(['checkApiKey', 'checkAllowedIp'])->group(function () {

// A:
Route::middleware(['checkApiKey'])->group(function () {
```

---

## 📞 Soporte

Si tienes problemas:

1. Verifica tu IP actual: `curl ifconfig.me`
2. Revisa los logs: `tail -f storage/logs/laravel.log`
3. Limpia cache: `php artisan config:clear`
4. Verifica sintaxis en `.env` (sin espacios extras)

---

**✅ Protección implementada exitosamente!**
