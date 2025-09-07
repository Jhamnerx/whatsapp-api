<?php

/**
 * Script para desencriptar el código PHP encriptado
 * Lee el contenido de data.txt y lo desencripta usando AES-256-CBC
 */

// Leer el contenido encriptado del archivo data.txt
$encryptedFile = __DIR__ . '/app/Services/Impl/data.txt';

if (!file_exists($encryptedFile)) {
    die("Error: El archivo data.txt no existe en: " . $encryptedFile . "\n");
}

$mpediaencrypt = file_get_contents($encryptedFile);

if (empty($mpediaencrypt)) {
    die("Error: El archivo data.txt está vacío\n");
}

// Trim para eliminar espacios en blanco y saltos de línea
$mpediaencrypt = trim($mpediaencrypt);

echo "Contenido encriptado leído: " . strlen($mpediaencrypt) . " caracteres\n";
echo "Primeros 100 caracteres: " . substr($mpediaencrypt, 0, 100) . "...\n\n";

// Parámetros de desencriptación
$cipher = 'AES-256-CBC';
$key = '379220';
$iv = 'ABCDEF0123456789';

echo "Desencriptando con:\n";
echo "Cipher: $cipher\n";
echo "Key: $key\n";
echo "IV: $iv\n\n";

// Desencriptar el contenido
$decryptedContent = openssl_decrypt($mpediaencrypt, $cipher, $key, 0, $iv);

if ($decryptedContent === false) {
    echo "Error: No se pudo desencriptar el contenido\n";
    echo "Error OpenSSL: " . openssl_error_string() . "\n";
    exit(1);
}

echo "¡Desencriptación exitosa!\n";
echo "Contenido desencriptado: " . strlen($decryptedContent) . " caracteres\n\n";

// Guardar el contenido desencriptado en un archivo
$outputFile = __DIR__ . '/app/Services/Impl/WhatsappServiceImpl_decrypted.php';
$result = file_put_contents($outputFile, $decryptedContent);

if ($result === false) {
    echo "Error: No se pudo guardar el archivo desencriptado\n";
    exit(1);
}

echo "Archivo desencriptado guardado en: $outputFile\n";
echo "Tamaño del archivo: " . filesize($outputFile) . " bytes\n\n";

// Mostrar las primeras líneas del código desencriptado
echo "Primeras líneas del código desencriptado:\n";
echo "==========================================\n";
$lines = explode("\n", $decryptedContent);
for ($i = 0; $i < min(20, count($lines)); $i++) {
    echo sprintf("%2d: %s\n", $i + 1, $lines[$i]);
}

if (count($lines) > 20) {
    echo "... (mostrando solo las primeras 20 líneas)\n";
}

echo "\n¡Proceso completado exitosamente!\n";
