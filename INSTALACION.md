# WhatsApp API - Guía de Instalación

Esta guía te ayudará a instalar el sistema WhatsApp API en **Ubuntu** y **AlmaLinux** con los requisitos necesarios.

## 📋 Requisitos del Sistema

- **Node.js**: v19.x
- **PHP**: v8.1
- **Composer**: Última versión
- **MySQL/MariaDB**: v8.0+ / v10.6+
- **Nginx/Apache**: Servidor web
- **Git**: Para clonar el repositorio

---

## 🔷 Instalación en Ubuntu 20.04/22.04

### 1. Actualizar el sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Instalar Node.js 19

```bash
# Instalar Node.js 19 usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version
```

### 3. Instalar PHP 8.1 y extensiones

```bash
# Agregar repositorio de PHP
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

# Instalar PHP 8.1 y extensiones necesarias
sudo apt install -y php8.1 php8.1-cli php8.1-fpm php8.1-mysql \
    php8.1-zip php8.1-gd php8.1-mbstring php8.1-curl php8.1-xml \
    php8.1-bcmath php8.1-intl php8.1-soap php8.1-gmp php8.1-exif \
    php8.1-dev php8.1-common php8.1-opcache php8.1-readline

# Nota: Las siguientes extensiones están incluidas por defecto en PHP 8.1:
# - json (incluida en php8.1-common)
# - openssl (incluida en php8.1-common)
# - fileinfo (incluida en php8.1-common)
# - tokenizer (incluida en php8.1-common)
# - xmlwriter (incluida en php8.1-xml)
# - simplexml (incluida en php8.1-xml)
# - dom (incluida en php8.1-xml)
# - pdo (incluida en php8.1-common)

# Para ver todas las extensiones disponibles:
# apt search php8.1- | grep -E "^php8.1-"

# Verificar instalación
php --version
```

### 4. Instalar MySQL

```bash
# Instalar MySQL Server
sudo apt install -y mysql-server

# Configurar seguridad
sudo mysql_secure_installation

# Iniciar y habilitar el servicio
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 5. Instalar Nginx

```bash
# Instalar Nginx
sudo apt install -y nginx

# Iniciar y habilitar el servicio
sudo systemctl start nginx
sudo systemctl enable nginx

# Configurar firewall
sudo ufw allow 'Nginx Full'
```

### 6. Instalar Git

```bash
sudo apt install -y git
```

---

## 🐧 Instalación en AlmaLinux 9

### 1. Actualizar el sistema

```bash
sudo dnf update -y
sudo dnf install -y epel-release
```

### 2. Instalar Node.js 19

```bash
# Instalar Node.js 19 usando NodeSource
curl -fsSL https://rpm.nodesource.com/setup_19.x | sudo bash -
sudo dnf install -y nodejs

# Verificar instalación
node --version
npm --version
```

### 3. Instalar PHP 8.1 y extensiones

```bash
# Habilitar repositorio Remi
sudo dnf install -y https://rpms.remirepo.net/enterprise/remi-release-9.rpm

# Instalar PHP 8.1 y extensiones necesarias
sudo dnf module reset php -y
sudo dnf module enable php:remi-8.1 -y
sudo dnf install -y php php-cli php-fpm php-mysqlnd php-zip php-devel \
    php-gd php-mcrypt php-mbstring php-curl php-xml php-pear \
    php-bcmath php-json php-fileinfo php-openssl php-tokenizer \
    php-xmlwriter php-simplexml php-dom php-pdo php-pdo_mysql \
    php-intl php-soap php-gmp php-exif

# Verificar instalación
php --version
```

### 4. Instalar MySQL/MariaDB

```bash
# Instalar MariaDB
sudo dnf install -y mariadb-server mariadb

# Iniciar y habilitar el servicio
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Configurar seguridad
sudo mysql_secure_installation
```

### 5. Instalar Nginx

```bash
# Instalar Nginx
sudo dnf install -y nginx

# Iniciar y habilitar el servicio
sudo systemctl start nginx
sudo systemctl enable nginx

# Configurar firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 5. Alternativa: Instalar Apache (httpd)

```bash
# Instalar Apache
sudo dnf install -y httpd

# Iniciar y habilitar el servicio
sudo systemctl start httpd
sudo systemctl enable httpd

# Configurar firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 6. Instalar Git

```bash
sudo dnf install -y git
```

---

## 🛠️ Instalación de Herramientas Generales

### Instalar Composer (Ubuntu/AlmaLinux)

```bash
# Descargar e instalar Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer

# Verificar instalación
composer --version
```

### Instalar PM2 (Ubuntu/AlmaLinux)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Verificar instalación
pm2 --version
```

---

## 🚀 Instalación del Proyecto

### 1. Clonar el repositorio

```bash
# Ir al directorio web
cd /var/www/

# Clonar el proyecto (reemplaza con tu repositorio)
sudo git clone https://github.com/tu-usuario/whatsapp-api.git
sudo chown -R $USER:$USER whatsapp-api
cd whatsapp-api
```

### 2. Instalar dependencias de PHP

```bash
# Instalar dependencias con Composer
composer install --optimize-autoloader --no-dev
```

### 3. Instalar dependencias de Node.js

```bash
# Instalar dependencias de Node.js
npm install

# Si tienes problemas con permisos
sudo npm install --unsafe-perm=true
```

### 4. Configurar el proyecto

```bash
# Copiar archivo de configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate
```

### 5. Configurar permisos

```bash
# Para Nginx (Ubuntu)
sudo chown -R www-data:www-data storage bootstrap/cache

# Para Nginx (AlmaLinux)
sudo chown -R nginx:nginx storage bootstrap/cache

# Para Apache (AlmaLinux)
sudo chown -R apache:apache storage bootstrap/cache

# Permisos generales
sudo chmod -R 775 storage bootstrap/cache
```

### 6. Configurar base de datos

```bash
# Editar archivo .env con tus datos de base de datos
nano .env

# Ejecutar migraciones
php artisan migrate

# Ejecutar seeders (si existen)
php artisan db:seed
```

---

## ⚙️ Configuración de Servidor Web

### Opción A: Configuración de Nginx (Ubuntu/AlmaLinux)

#### Crear archivo de configuración

```bash
sudo nano /etc/nginx/sites-available/whatsapp-api
```

#### Contenido del archivo (Ubuntu)

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/whatsapp-api/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

#### Para AlmaLinux con Nginx

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/whatsapp-api/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

#### Activar sitio (Ubuntu)

```bash
sudo ln -s /etc/nginx/sites-available/whatsapp-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Activar sitio (AlmaLinux)

```bash
# Incluir configuración en nginx.conf
sudo nano /etc/nginx/nginx.conf
# Agregar: include /etc/nginx/sites-available/whatsapp-api;

sudo nginx -t
sudo systemctl reload nginx
```

### Opción B: Configuración de Apache (httpd) - AlmaLinux

#### Configurar DocumentRoot principal

```bash
# Editar configuración principal de Apache
sudo nano /etc/httpd/conf/httpd.conf
```

#### Modificar DocumentRoot en httpd.conf

```apache
# Cambiar la línea DocumentRoot
DocumentRoot "/var/www/whatsapp-api/public"

# Configurar permisos del directorio
<Directory "/var/www/whatsapp-api/public">
    AllowOverride All
    # Allow open access:
    Require all granted
</Directory>
```

#### Crear VirtualHost

```bash
# Crear archivo de configuración del VirtualHost
sudo nano /etc/httpd/conf.d/whatsapp-api.conf
```

#### Contenido del VirtualHost

```apache
<VirtualHost *:80>
    ServerName tu-dominio.com
    ServerAlias www.tu-dominio.com
    DocumentRoot /var/www/whatsapp-api/public

    <Directory /var/www/whatsapp-api/public>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Logs específicos del sitio
    ErrorLog /var/log/httpd/whatsapp_error.log
    CustomLog /var/log/httpd/whatsapp_access.log combined

    # Configuración adicional para Laravel
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^(.*)$ index.php/$1 [L]
    </IfModule>
</VirtualHost>
```

#### Activar módulos necesarios y reiniciar Apache

```bash
# Habilitar mod_rewrite
sudo systemctl enable httpd

# Verificar configuración
sudo httpd -t

# Reiniciar Apache
sudo systemctl restart httpd

# Verificar estado
sudo systemctl status httpd
```

---

### Configuración de PHP-FPM

#### Ubuntu (con Nginx)

```bash
# Configurar PHP-FPM
sudo nano /etc/php/8.1/fpm/pool.d/www.conf

# Cambiar usuario y grupo
user = www-data
group = www-data

# Reiniciar PHP-FPM
sudo systemctl restart php8.1-fpm
```

#### AlmaLinux (con Nginx)

```bash
# Configurar PHP-FPM
sudo nano /etc/php-fpm.d/www.conf

# Cambiar usuario y grupo
user = nginx
group = nginx

# Reiniciar PHP-FPM
sudo systemctl restart php-fpm
```

#### AlmaLinux (con Apache)

```bash
# Configurar PHP-FPM para Apache
sudo nano /etc/php-fpm.d/www.conf

# Cambiar usuario y grupo
user = apache
group = apache

# Configurar socket para Apache
listen = /run/php-fpm/www.sock
listen.owner = apache
listen.group = apache
listen.mode = 0660

# Reiniciar PHP-FPM
sudo systemctl restart php-fpm

# Asegurar que mod_proxy_fcgi esté habilitado en Apache
sudo dnf install -y php-fpm
```

---

## 🗃️ Configuración de Base de Datos

### Crear base de datos

```sql
-- Conectar a MySQL
mysql -u root -p

-- Crear base de datos
CREATE DATABASE whatsapp_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario
CREATE USER 'whatsapp_user'@'localhost' IDENTIFIED BY 'tu_password_seguro';

-- Otorgar permisos
GRANT ALL PRIVILEGES ON whatsapp_api.* TO 'whatsapp_user'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Salir
EXIT;
```

---

## 🚀 Configuración de PM2 (Producción)

### Crear archivo de configuración PM2

```bash
# Crear archivo ecosystem.config.js en el directorio del proyecto
nano ecosystem.config.js
```

### Contenido del archivo ecosystem.config.js

```javascript
module.exports = {
  apps: [
    {
      name: "whatsapp-api",
      script: "server.js",
      cwd: "/var/www/whatsapp-api",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/var/log/pm2/whatsapp-api-error.log",
      out_file: "/var/log/pm2/whatsapp-api-out.log",
      log_file: "/var/log/pm2/whatsapp-api.log",
      time: true,
    },
  ],
};
```

### Crear directorio de logs

```bash
# Crear directorio para logs de PM2
sudo mkdir -p /var/log/pm2
sudo chown -R $USER:$USER /var/log/pm2
```

### Comandos de PM2

```bash
# Iniciar aplicación con PM2
pm2 start ecosystem.config.js

# O iniciar directamente el archivo
pm2 start server.js --name "whatsapp-api"

# Ver estado de las aplicaciones
pm2 status

# Ver logs en tiempo real
pm2 logs whatsapp-api

# Reiniciar aplicación
pm2 restart whatsapp-api

# Detener aplicación
pm2 stop whatsapp-api

# Eliminar aplicación de PM2
pm2 delete whatsapp-api

# Guardar configuración actual de PM2
pm2 save

# Configurar PM2 para iniciar automáticamente en el boot del sistema
pm2 startup

# Después de ejecutar pm2 startup, ejecutar el comando que te muestre
# Ejemplo: sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

### Monitoreo con PM2

```bash
# Monitor en tiempo real
pm2 monit

# Ver información detallada
pm2 show whatsapp-api

# Recargar aplicación sin downtime
pm2 reload whatsapp-api
```

---

## 🛠️ Comandos de Ejecución

### Ejecutar migraciones

```bash
php artisan migrate
```

### Ejecutar servidor Node.js (Desarrollo)

```bash
# En el directorio del proyecto (solo para desarrollo)
node server.js

# O con nodemon para desarrollo
npm install -g nodemon
nodemon server.js
```

### Ejecutar Laravel (desarrollo)

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

---

## 🔍 Verificación de Instalación

### Verificar servicios

```bash
# Verificar Node.js
node --version

# Verificar PHP
php --version

# Verificar Composer
composer --version

# Verificar Nginx
sudo nginx -t

# Verificar MySQL
sudo systemctl status mysql    # Ubuntu
sudo systemctl status mariadb  # AlmaLinux

# Verificar PHP-FPM
sudo systemctl status php8.1-fpm  # Ubuntu
sudo systemctl status php-fpm     # AlmaLinux
```

### Verificar extensiones de PHP

```bash
php -m | grep -E "(mysqli|pdo|mbstring|xml|zip|gd|curl|json|openssl)"
```

---

## 🛠️ Solución de Problemas Comunes

### Permisos de archivos

```bash
sudo chown -R www-data:www-data /var/www/whatsapp-api  # Ubuntu
sudo chown -R nginx:nginx /var/www/whatsapp-api        # AlmaLinux
sudo chmod -R 755 /var/www/whatsapp-api
sudo chmod -R 775 /var/www/whatsapp-api/storage
sudo chmod -R 775 /var/www/whatsapp-api/bootstrap/cache
```

### Limpiar caché de Laravel

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### Logs de errores

```bash
# Logs de Nginx
sudo tail -f /var/log/nginx/error.log

# Logs de PHP-FPM
sudo tail -f /var/log/php8.1-fpm.log  # Ubuntu
sudo tail -f /var/log/php-fpm/error.log  # AlmaLinux

# Logs de Laravel
tail -f storage/logs/laravel.log
```

---

## 📱 Configuración Final

1. Accede a `http://tu-dominio.com/install` para completar la instalación
2. Configura los parámetros de la aplicación
3. Configura los webhooks y API keys por device
4. Prueba la conexión de WhatsApp

---

## 🔐 Seguridad Adicional

### Configurar SSL con Let's Encrypt

```bash
# Ubuntu/AlmaLinux
sudo dnf install -y certbot python3-certbot-nginx  # AlmaLinux
sudo apt install -y certbot python3-certbot-nginx  # Ubuntu

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com

# Renovación automática
sudo crontab -e
# Agregar: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Configurar Firewall

```bash
# AlmaLinux
sudo firewall-cmd --permanent --add-port=3000/tcp  # Node.js
sudo firewall-cmd --reload

# Ubuntu
sudo ufw allow 3000/tcp  # Node.js
sudo ufw enable
```

---

**✅ ¡Instalación completada!** Tu sistema WhatsApp API está listo para usar.
