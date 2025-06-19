# PHP Email Setup для AI Tracking

## 📁 Файлы для отправки промокодов

Создано 2 варианта PHP скриптов:

### 1. `send-promocode.php` - Базовая версия
- Использует встроенную функцию `mail()` PHP
- Не требует дополнительных библиотек
- Может не работать на всех хостингах

### 2. `send-promocode-advanced.php` - Рекомендуемая версия
- Использует PHPMailer для надежной SMTP отправки
- Требует установки PHPMailer
- Работает на большинстве хостингов

## 🚀 Установка (Рекомендуемый способ)

### Вариант 1: С Composer (рекомендуется)
```bash
# В папке с сайтом
composer require phpmailer/phpmailer

# Переименуйте файл
mv send-promocode-advanced.php send-promocode.php
```

### Вариант 2: Без Composer
1. Скачайте PHPMailer: https://github.com/PHPMailer/PHPMailer/releases
2. Распакуйте в папку `phpmailer/`
3. В `send-promocode-advanced.php` замените:
```php
require_once 'vendor/autoload.php';
```
на:
```php
require_once 'phpmailer/src/Exception.php';
require_once 'phpmailer/src/PHPMailer.php';
require_once 'phpmailer/src/SMTP.php';
```

### Вариант 3: Базовая версия (если PHPMailer недоступен)
```bash
# Просто используйте базовую версию
# send-promocode.php уже готов к работе
```

## 🔧 Настройка веб-сервера

### Apache (.htaccess)
```apache
# Разрешить CORS
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "POST, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type"

# Обработка OPTIONS запросов
RewriteEngine On
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
```

### Nginx
```nginx
location ~ \.php$ {
    add_header Access-Control-Allow-Origin "*";
    add_header Access-Control-Allow-Methods "POST, OPTIONS";
    add_header Access-Control-Allow-Headers "Content-Type";
    
    if ($request_method = 'OPTIONS') {
        return 200;
    }
    
    fastcgi_pass php-fpm;
    fastcgi_index index.php;
    include fastcgi_params;
}
```

## ✅ Тестирование

### 1. Проверьте PHP скрипт напрямую:
```bash
curl -X POST http://yourdomain.com/send-promocode.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","promo_code":"AI3FREETEST123"}'
```

### 2. Проверьте через форму на сайте
- Откройте сайт
- Заполните форму
- Проверьте консоль разработчика на ошибки

## 🐛 Устранение проблем

### Ошибка: "CORS"
- Убедитесь что CORS заголовки настроены
- Проверьте что скрипт обрабатывает OPTIONS запросы

### Ошибка: "Class 'PHPMailer' not found"
- Установите PHPMailer через Composer
- Или используйте базовую версию `send-promocode.php`

### Ошибка: "Could not authenticate"
- Проверьте SMTP credentials в скрипте
- Убедитесь что order@aitracking.app может отправлять через mail.ru

### Письма не приходят
- Проверьте папку "Спам"
- Проверьте логи веб-сервера
- Проверьте логи PHP (error_log)

## 🔒 Безопасность

### Рекомендации:
1. **Скройте credentials** - вынесите в переменные окружения:
```php
$smtp_pass = $_ENV['SMTP_PASSWORD'] ?? 'ffBs89e1wezVn4TdHBtn';
```

2. **Ограничьте запросы** - добавьте rate limiting:
```php
// Ограничение: 5 запросов в минуту с одного IP
session_start();
$ip = $_SERVER['REMOTE_ADDR'];
$key = "email_limit_{$ip}";
if (($_SESSION[$key] ?? 0) > 5) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests']);
    exit;
}
$_SESSION[$key] = ($_SESSION[$key] ?? 0) + 1;
```

3. **Логирование** - ведите лог отправленных промокодов:
```php
error_log("Promo code sent: {$promo_code} to {$email}");
```

## ✨ Преимущества PHP решения

- ✅ **Никакого стороннего брендинга**
- ✅ **Полный контроль над письмами**  
- ✅ **Бесплатно**
- ✅ **Используете свой SMTP напрямую**
- ✅ **Красивые HTML письма**
- ✅ **Fallback на текстовую версию**

Теперь ваши промокоды будут отправляться без надписи "Email sent via EmailJS.com"! 🎉 