<?php
// CORS headers for frontend requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['email']) || !isset($input['promo_code'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: email, promo_code']);
    exit;
}

$email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);
$promo_code = htmlspecialchars($input['promo_code']);

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// SMTP Configuration
$smtp_host = 'smtp.mail.ru';
$smtp_port = 465;
$smtp_user = 'order@aitracking.app';
$smtp_pass = 'ffBs89e1wezVn4TdHBtn';
$smtp_from = 'order@aitracking.app';
$smtp_from_name = 'AITracking';

// Email content
$to_name = explode('@', $email)[0];
$subject = "Ваш промокод AI Tracking: {$promo_code}";
$expiry_date = date('j F Y г. в H:i', strtotime('+30 days'));

$html_body = "
<div style=\"font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px; margin: 0 auto;\">
  <div style=\"text-align: center; padding: 20px 0; border-bottom: 1px solid #eaeaea;\">
    <h1 style=\"color: #667eea; margin: 0;\">AI Tracking</h1>
  </div>
  
  <div style=\"padding: 20px 0;\">
    <p style=\"padding-top: 14px; border-top: 1px solid #eaeaea; margin-top: 20px;\">
      Спасибо за интерес к AI Tracking! Ваш промокод на 3 бесплатных анализа готов:
    </p>
    
    <div style=\"background: #f8f9fa; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;\">
      <p style=\"font-size: 24px; font-weight: bold; color: #667eea; margin: 0;\">{$promo_code}</p>
    </div>
    
    <p>Этот промокод будет действителен до <strong>{$expiry_date}</strong>.</p>
    
    <div style=\"background: #fff; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px; margin: 20px 0;\">
      <h3 style=\"color: #333; margin-top: 0;\">🎯 Что вы получаете:</h3>
      <ul style=\"color: #666; line-height: 1.6;\">
        <li>3 полных анализа любых дизайнов</li>
        <li>Детальные отчеты с рекомендациями</li>
        <li>Heatmap и click-tracking данные</li>
        <li>Анализ пользовательского поведения</li>
      </ul>
    </div>
    
    <div style=\"background: #fff; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px; margin: 20px 0;\">
      <h3 style=\"color: #333; margin-top: 0;\">📝 Как использовать:</h3>
      <ol style=\"color: #666; line-height: 1.6;\">
        <li>Зайдите на наш сайт <a href=\"https://aitracking.app\" style=\"color: #667eea;\">aitracking.app</a></li>
        <li>Зарегистрируйтесь или войдите в аккаунт</li>
        <li>Введите промокод <strong>{$promo_code}</strong> при оформлении</li>
        <li>Загрузите свои дизайны для анализа</li>
      </ol>
    </div>
    
    <p style=\"color: #666;\">
      Используйте промокод при регистрации на нашем сайте для получения 3 бесплатных AI-анализов дизайна.<br />
      Анализируйте интерфейсы, рекламные креативы, лендинги и получайте детальные отчеты с рекомендациями.
    </p>
    
    <div style=\"text-align: center; padding: 20px 0; border-top: 1px solid #eaeaea; margin-top: 30px;\">
      <p style=\"color: #999; font-size: 12px; margin: 0;\">
        С уважением,<br>
        <strong style=\"color: #667eea;\">Команда AI Tracking</strong><br>
        <a href=\"https://aitracking.app\" style=\"color: #667eea;\">aitracking.app</a>
      </p>
    </div>
  </div>
</div>
";

$text_body = "
AI Tracking - Ваш промокод готов!

Привет, {$to_name}!

Спасибо за интерес к AI Tracking! Ваш промокод на 3 бесплатных анализа: {$promo_code}

Промокод действителен до: {$expiry_date}

Что вы получаете:
• 3 полных анализа любых дизайнов  
• Детальные отчеты с рекомендациями
• Heatmap и click-tracking данные
• Анализ пользовательского поведения

Как использовать:
1. Зайдите на aitracking.app
2. Зарегистрируйтесь или войдите в аккаунт  
3. Введите промокод {$promo_code} при оформлении
4. Загрузите свои дизайны для анализа

С уважением,
Команда AI Tracking
https://aitracking.app
";

// Create email headers
$boundary = uniqid('boundary_');
$headers = [
    "MIME-Version: 1.0",
    "Content-Type: multipart/alternative; boundary=\"{$boundary}\"",
    "From: {$smtp_from_name} <{$smtp_from}>",
    "Reply-To: {$smtp_from}",
    "X-Mailer: PHP/" . phpversion()
];

$email_body = "--{$boundary}\r\n";
$email_body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$email_body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$email_body .= $text_body . "\r\n\r\n";

$email_body .= "--{$boundary}\r\n";
$email_body .= "Content-Type: text/html; charset=UTF-8\r\n";
$email_body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$email_body .= $html_body . "\r\n\r\n";

$email_body .= "--{$boundary}--\r\n";

// Send email using PHP mail() with SMTP
ini_set('SMTP', $smtp_host);
ini_set('smtp_port', $smtp_port);
ini_set('sendmail_from', $smtp_from);

// For production, you should use PHPMailer or SwiftMailer for better SMTP support
// This is a simple implementation that works with basic SMTP

// 1. Send promo code to user
$success_user = mail(
    $email,
    $subject,
    $email_body,
    implode("\r\n", $headers)
);

// 2. Send notification to admin
$admin_email = 'order@aitracking.app';
$admin_subject = "Новый запрос промокода AI Tracking";
$request_date = date('j F Y г. в H:i');

$admin_html_body = "
<div style=\"font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px; margin: 0 auto;\">
  <div style=\"text-align: center; padding: 20px 0; border-bottom: 1px solid #eaeaea;\">
    <h1 style=\"color: #7A7ADB; margin: 0;\">AI Tracking</h1>
    <p style=\"color: #666; margin: 5px 0 0 0;\">Новый запрос промокода</p>
  </div>
  
  <div style=\"padding: 20px 0;\">
    <h2 style=\"color: #333; margin-top: 0;\">📧 Детали запроса:</h2>
    
    <div style=\"background: #f8f9fa; border-left: 4px solid #7A7ADB; padding: 20px; margin: 20px 0;\">
      <p style=\"margin: 0 0 10px 0;\"><strong>Email клиента:</strong> <a href=\"mailto:{$email}\" style=\"color: #7A7ADB;\">{$email}</a></p>
      <p style=\"margin: 0 0 10px 0;\"><strong>Промокод:</strong> <span style=\"background: #e8f4f8; padding: 4px 8px; border-radius: 4px; font-family: monospace;\">{$promo_code}</span></p>
      <p style=\"margin: 0 0 10px 0;\"><strong>Дата запроса:</strong> {$request_date}</p>
      <p style=\"margin: 0;\"><strong>Срок действия:</strong> {$expiry_date}</p>
    </div>
    
    <div style=\"background: #e8f4f8; border: 1px solid #7A7ADB; padding: 20px; border-radius: 8px; margin: 20px 0;\">
      <h3 style=\"color: #333; margin-top: 0;\">🎯 Рекомендуемые действия:</h3>
      <ul style=\"color: #666; line-height: 1.6; margin: 0;\">
        <li>Отслеживать использование промокода в системе</li>
        <li>Добавить email в базу потенциальных клиентов</li>
        <li>При необходимости отправить дополнительную информацию</li>
        <li>Проанализировать источник трафика</li>
      </ul>
    </div>
    
    <div style=\"background: #fff; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px; margin: 20px 0;\">
      <h3 style=\"color: #333; margin-top: 0;\">💬 Что получил клиент:</h3>
      <p style=\"color: #666; line-height: 1.6; margin: 0;\">
        Клиент получил письмо с промокодом <strong>{$promo_code}</strong> на 3 бесплатных анализа. 
        Промокод действителен до {$expiry_date}.
      </p>
    </div>
    
    <div style=\"text-align: center; padding: 20px 0; border-top: 1px solid #eaeaea; margin-top: 30px;\">
      <p style=\"color: #999; font-size: 12px; margin: 0;\">
        Запрос отправлен с сайта<br>
        <a href=\"https://aitracking.app\" style=\"color: #7A7ADB;\">aitracking.app</a>
      </p>
    </div>
  </div>
</div>
";

$admin_text_body = "
AI Tracking - Новый запрос промокода

Детали запроса:
Email клиента: {$email}
Промокод: {$promo_code}
Дата запроса: {$request_date}
Срок действия: {$expiry_date}

Рекомендуемые действия:
• Отслеживать использование промокода в системе
• Добавить email в базу потенциальных клиентов
• При необходимости отправить дополнительную информацию
• Проанализировать источник трафика

Что получил клиент:
Клиент получил письмо с промокодом {$promo_code} на 3 бесплатных анализа.
Промокод действителен до {$expiry_date}.

---
Запрос отправлен с сайта https://aitracking.app
";

// Create admin email headers
$admin_boundary = uniqid('admin_boundary_');
$admin_headers = [
    "MIME-Version: 1.0",
    "Content-Type: multipart/alternative; boundary=\"{$admin_boundary}\"",
    "From: {$smtp_from_name} <{$smtp_from}>",
    "Reply-To: {$email}",
    "X-Mailer: PHP/" . phpversion()
];

$admin_email_body = "--{$admin_boundary}\r\n";
$admin_email_body .= "Content-Type: text/plain; charset=UTF-8\r\n";
$admin_email_body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$admin_email_body .= $admin_text_body . "\r\n\r\n";

$admin_email_body .= "--{$admin_boundary}\r\n";
$admin_email_body .= "Content-Type: text/html; charset=UTF-8\r\n";
$admin_email_body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$admin_email_body .= $admin_html_body . "\r\n\r\n";

$admin_email_body .= "--{$admin_boundary}--\r\n";

$success_admin = mail(
    $admin_email,
    $admin_subject,
    $admin_email_body,
    implode("\r\n", $admin_headers)
);

// Check results
if ($success_user) {
    // Always return success if user email was sent, admin notification is secondary
    echo json_encode([
        'success' => true,
        'message' => 'Промокод успешно отправлен на ваш email',
        'promo_code' => $promo_code,
        'admin_notified' => $success_admin
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Ошибка отправки email. Попробуйте позже.',
        'debug' => error_get_last()
    ]);
}
?> 