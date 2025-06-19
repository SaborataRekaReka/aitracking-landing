# Настройка EmailJS для отправки промокодов

## 🔧 Пошаговая настройка EmailJS с SMTP mail.ru

### Шаг 1: Регистрация в EmailJS

1. Перейдите на [emailjs.com](https://www.emailjs.com/)
2. Нажмите "Sign Up" и создайте аккаунт
3. Подтвердите email

### Шаг 2: Добавление Email Service

1. В панели EmailJS перейдите в раздел **"Email Services"**
2. Нажмите **"Add New Service"**
3. Выберите **"Custom SMTP Server"**
4. Заполните настройки SMTP:

```
Service Name: AITracking Mail.ru SMTP
SMTP Server: smtp.mail.ru
Port: 465
Username: order@aitracking.app
Password: ffBs89e1wezVn4TdHBtn
Security: SSL/TLS
From Email: order@aitracking.app
From Name: AITracking
```

5. Нажмите **"Add Service"**
6. **Service ID:** `service_wmfwg7g` ✅

### Шаг 3: Создание Email Template

1. Перейдите в раздел **"Email Templates"**
2. Нажмите **"Create New Template"**
3. Заполните шаблон:

**Template Settings (обновите в EmailJS Dashboard):**
- Template Name: `AI Tracking Promo Code`
- From Name: `AITracking`
- From Email: `order@aitracking.app`
- To Name: `{{to_name}}`
- To Email: `{{to_email}}`
- Subject: `Ваш промокод AI Tracking: {{passcode}}`

**HTML Content (замените в EmailJS Dashboard):**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px">
  <a style="text-decoration: none; outline: none" href="https://aitracking.app" target="_blank">
    <img style="height: 32px; vertical-align: middle" height="32px" src="https://aitracking.app/assets/images/logo.svg" alt="AI Tracking" />
  </a>
  <p style="padding-top: 14px; border-top: 1px solid #eaeaea">
    Спасибо за интерес к AI Tracking! Ваш промокод на 3 бесплатных анализа готов:
  </p>
  <p style="font-size: 22px"><strong>{{passcode}}</strong></p>
  <p>Этот промокод будет действителен до <strong>{{time}}</strong>.</p>
  <p>
    Используйте промокод при регистрации на нашем сайте для получения 3 бесплатных AI-анализов дизайна.<br />
    Анализируйте интерфейсы, рекламные креативы, лендинги и получайте детальные отчеты с рекомендациями.
  </p>
  <p>Спасибо за выбор AI Tracking!</p>
</div>
```

4. Нажмите **"Save"**
5. **Template ID:** `template_m4t998s` ✅

### Шаг 4: Получение Public Key

1. Перейдите в **"Account"** → **"General"**
2. Найдите **"Public Key"**
3. **Public Key:** `GqcshomnFvqp5Gg8F` ✅

### Шаг 5: Обновление кода

Замените в файлах следующие значения:

**В `index.html`:**
```javascript
emailjs.init("GqcshomnFvqp5Gg8F"); // ✅ Public Key уже обновлен
```

**В `assets/js/main.js`:**
```javascript
const result = await emailjs.send(
    'service_wmfwg7g',    // ✅ Service ID уже обновлен
    'template_m4t998s',   // ✅ Template ID уже обновлен
    emailData
);
```

### Шаг 6: Тестирование

1. Сохраните изменения
2. Откройте сайт в браузере
3. Заполните форму своим email
4. Проверьте консоль браузера на наличие ошибок
5. Проверьте почту на получение письма

## 📧 Текущий статус настройки

✅ **SMTP Сервер:** smtp.mail.ru  
✅ **Порт:** 465 (SSL)  
✅ **Логин:** order@aitracking.app  
✅ **Пароль:** ffBs89e1wezVn4TdHBtn  
✅ **От кого:** AITracking <order@aitracking.app>  
✅ **Service ID:** service_wmfwg7g  
✅ **Template ID:** template_m4t998s  
✅ **Public Key:** GqcshomnFvqp5Gg8F

🎉 **Настройка завершена! Все готово для отправки email.**

## 🔧 Альтернативное решение (PHP backend)

Если хотите избежать EmailJS и использовать прямую SMTP отправку, могу создать простой PHP-скрипт.

## 📞 Поддержка

Если возникнут проблемы:
1. Проверьте консоль браузера на ошибки
2. Убедитесь что EmailJS Service настроен с правильными SMTP данными
3. Проверьте что order@aitracking.app активен и может отправлять письма через mail.ru 