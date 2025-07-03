# 🚀 AITracking Landing Page

![AITracking](https://img.shields.io/badge/AITracking-Landing%20Page-blue)
![Version](https://img.shields.io/badge/version-2.0.0-green)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen)

Современная landing page для AITracking - AI-сервиса анализа поведения пользователей на сайтах.

## 📋 Содержание

- [🌟 Особенности](#-особенности)
- [🛠 Технологии](#-технологии)
- [📁 Структура проекта](#-структура-проекта)
- [🚀 Быстрый старт](#-быстрый-старт)
- [📧 Настройка email](#-настройка-email)
- [🌐 Деплой](#-деплой)
- [⚙️ Настройка сервера](#️-настройка-сервера)
- [🔄 Обновление проекта](#-обновление-проекта)
- [📊 Мониторинг](#-мониторинг)
- [🔒 Безопасность](#-безопасность)

## 🌟 Особенности

### ✨ Дизайн и UX
- 🎨 Современный градиентный дизайн
- 📱 Полностью адаптивная верстка
- 🌙 Плавные анимации и переходы
- 🎯 Оптимизированная конверсия

### 🔧 Функциональность
- 💰 Система тарифных планов с переключением месяц/год
- 🎁 Автоматическая генерация промокодов
- 📝 Форма заказа демонстрации
- 📧 Система email-уведомлений
- 🌍 Двуязычная поддержка (RU/EN)

### ⚡ Производительность
- 🚀 Оптимизированные CSS и JS файлы
- 🖼️ Сжатие и оптимизация изображений
- 📦 Минификация ресурсов
- 🔄 Кэширование статических файлов

## 🛠 Технологии

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: PHP 7.4+ (для email-форм)
- **Стили**: CSS Grid, Flexbox, CSS Variables
- **Email**: SMTP через PHPMailer
- **Деплой**: Git, GitHub Pages/любой хостинг

## 📁 Структура проекта

```
aitracking-landing/
├── 📄 index.html              # Главная страница (RU)
├── 📁 en/
│   └── 📄 index.html          # Английская версия
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── style-optimized.css     # Основные стили
│   │   └── carousel-optimized.css  # Стили карусели
│   ├── 📁 js/
│   │   ├── main.js                 # Основная логика
│   │   └── hero-carousel-optimized.js # Карусель
│   └── 📁 images/
│       ├── 📁 examples/       # Примеры работ
│       ├── 📁 reports/        # Типы отчетов
│       ├── 📁 reviews/        # Фото отзывов
│       ├── 📁 tabs/           # Изображения для табов
│       └── 📁 logos/          # Логотипы клиентов
├── 📄 send-promocode.php      # Отправка промокодов
├── 📄 send-demo-request.php   # Заявки на демо
└── 📄 README.md               # Документация
```

## 🚀 Быстрый старт

### 1️⃣ Клонирование репозитория

```bash
# Клонируем репозиторий
git clone https://github.com/SaborataRekaReka/aitracking-landing.git

# Переходим в директорию
cd aitracking-landing
```

### 2️⃣ Локальная разработка

```bash
# Для простого просмотра
# Откройте index.html в браузере

# Для разработки с live reload (рекомендуется)
# Используйте Live Server в VS Code
# Или любой другой локальный сервер

# Python (если установлен)
python -m http.server 8000

# Node.js (если установлен)
npx http-server

# PHP (если установлен)
php -S localhost:8000
```

Откройте браузер и перейдите на `http://localhost:8000`

### 3️⃣ Настройка для продакшена

Для полной функциональности на продакшене необходимо:

1. **Настроить email-отправку** (см. раздел ниже)
2. **Загрузить на хостинг с поддержкой PHP**
3. **Настроить SSL-сертификат**

## 📧 Настройка email

### Конфигурация SMTP

Отредактируйте файлы `send-promocode.php` и `send-demo-request.php`:

```php
// SMTP настройки
$mail->isSMTP();
$mail->Host = 'smtp.mail.ru';           // Ваш SMTP сервер
$mail->SMTPAuth = true;
$mail->Username = 'order@aitracking.app'; // Ваш email
$mail->Password = 'ваш_пароль';            // Пароль от почты
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

### Поддерживаемые SMTP провайдеры

| Провайдер | Host | Port | Encryption |
|-----------|------|------|------------|
| Gmail | smtp.gmail.com | 587 | STARTTLS |
| Mail.ru | smtp.mail.ru | 587 | STARTTLS |
| Yandex | smtp.yandex.ru | 587 | STARTTLS |
| Outlook | smtp-mail.outlook.com | 587 | STARTTLS |

### Тестирование email

```bash
# Отправьте тестовый запрос через форму
# Проверьте логи сервера в случае ошибок
tail -f /var/log/apache2/error.log  # Apache
tail -f /var/log/nginx/error.log    # Nginx
```

## 🌐 Деплой

### GitHub Pages (статика без PHP)

```bash
# Деплой автоматический через Settings > Pages
# Выберите main branch
# URL: https://username.github.io/aitracking-landing
```

⚠️ **Внимание**: GitHub Pages не поддерживает PHP. Email-формы работать не будут.

### Хостинг с PHP поддержкой

#### Через FTP/SFTP:

```bash
# Загрузите все файлы в корневую директорию сайта
# Убедитесь, что PHP версии 7.4+ поддерживается
# Установите права доступа 755 для .php файлов
```

#### Через Git (если хостинг поддерживает):

```bash
# На сервере
git clone https://github.com/SaborataRekaReka/aitracking-landing.git
cd aitracking-landing

# Настройте веб-сервер на эту директорию
```

### Рекомендуемые хостинги

| Хостинг | PHP | Git | SSL | Цена |
|---------|-----|-----|-----|------|
| Beget | ✅ | ✅ | ✅ | ~$2/мес |
| TimeWeb | ✅ | ✅ | ✅ | ~$3/мес |
| Reg.ru | ✅ | ✅ | ✅ | ~$2/мес |
| DigitalOcean | ✅ | ✅ | ✅ | $5/мес |

## ⚙️ Настройка сервера

### Apache (.htaccess)

Создайте файл `.htaccess` в корне:

```apache
# Сжатие
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Кэширование
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Безопасность
<IfModule mod_headers.c>
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Переадресация на HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Nginx

Конфигурация для Nginx:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/aitracking-landing;
    index index.html index.php;
    
    # SSL настройки
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Сжатие
    gzip on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    
    # Кэширование статики
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # PHP обработка
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    # Безопасность
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## 🔄 Обновление проекта

### Локальные изменения

```bash
# 1. Внесите изменения в файлы
# 2. Добавьте в Git
git add .

# 3. Создайте коммит
git commit -m "Описание изменений"

# 4. Отправьте на GitHub
git push origin main
```

### Обновление на сервере

```bash
# Через Git (если настроен)
git pull origin main

# Через FTP
# Загрузите измененные файлы через FTP клиент
```

### Основные файлы для редактирования

| Файл | Назначение |
|------|------------|
| `index.html` | Основная страница (RU) |
| `en/index.html` | Английская версия |
| `assets/css/style-optimized.css` | Стили |
| `assets/js/main.js` | JavaScript |
| `send-promocode.php` | Email промокодов |
| `send-demo-request.php` | Email демо-заявок |

## 📊 Мониторинг

### Аналитика

Добавьте коды аналитики в `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Яндекс.Метрика -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

### Мониторинг производительности

```bash
# Проверка скорости загрузки
curl -o /dev/null -s -w 'Total: %{time_total}s\n' https://yourdomain.com

# Проверка статуса сервера
curl -I https://yourdomain.com

# Мониторинг лог-файлов
tail -f /var/log/apache2/access.log | grep "POST.*\.php"
```

## 🔒 Безопасность

### Обязательные меры

1. **SSL сертификат**
   ```bash
   # Let's Encrypt (бесплатно)
   sudo certbot --apache -d yourdomain.com
   ```

2. **Обновления PHP**
   ```bash
   sudo apt update && sudo apt upgrade php
   ```

3. **Права доступа к файлам**
   ```bash
   chmod 644 *.html *.css *.js
   chmod 755 *.php
   ```

4. **Бэкапы**
   ```bash
   # Автоматический бэкап
   0 2 * * * tar -czf /backups/aitracking-$(date +\%Y\%m\%d).tar.gz /var/www/aitracking-landing
   ```

### Защита от спама

В PHP файлах уже реализована базовая защита:
- Валидация email адресов
- Защита от XSS
- Rate limiting (можно улучшить)

## 📞 Поддержка

### Частые проблемы

| Проблема | Решение |
|----------|---------|
| Email не отправляются | Проверьте SMTP настройки и пароль |
| Стили не загружаются | Очистите кэш браузера |
| PHP ошибки | Проверьте error_log сервера |
| Формы не работают | Убедитесь что PHP включен |

### Контакты

- **Email**: order@aitracking.app
- **GitHub**: https://github.com/SaborataRekaReka/aitracking-landing
- **Telegram**: @aitracking_support

---

## 📜 История изменений

### v2.0.0 (Текущая версия)
- ✅ Обновлены цены на тарифы
- ✅ Добавлена форма заказа демонстрации
- ✅ Заменены все изображения
- ✅ Удалена зависимость от EmailJS
- ✅ Улучшена система email-уведомлений
- ✅ Добавлен эффект нагрева кнопки
- ✅ Оптимизированы CSS и JS файлы

### v1.0.0
- ✅ Базовая функциональность
- ✅ Двуязычная поддержка
- ✅ Система промокодов
- ✅ Адаптивный дизайн

---

**Создано с ❤️ для AITracking**

![GitHub last commit](https://img.shields.io/github/last-commit/SaborataRekaReka/aitracking-landing)
![GitHub repo size](https://img.shields.io/github/repo-size/SaborataRekaReka/aitracking-landing) 