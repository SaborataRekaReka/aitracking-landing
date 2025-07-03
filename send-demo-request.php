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

if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['phone'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: name, email, phone']);
    exit;
}

$name = htmlspecialchars($input['name']);
$email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);
$phone = htmlspecialchars($input['phone']);
$date = isset($input['date']) ? htmlspecialchars($input['date']) : '';
$time = isset($input['time']) ? htmlspecialchars($input['time']) : '';
$comment = isset($input['comment']) ? htmlspecialchars($input['comment']) : '';

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// SMTP Configuration - используем те же настройки что и для промокодов
$smtp_host = 'smtp.mail.ru';
$smtp_port = 465;
$smtp_user = 'order@aitracking.app';
$smtp_pass = 'ffBs89e1wezVn4TdHBtn';
$smtp_from = 'order@aitracking.app';
$smtp_from_name = 'AITracking Website';

// Recipient email (ваша почта)
$recipient_email = 'order@aitracking.app';

// Email content
$subject = "Новая заявка на демонстрацию AI Tracking";
$request_date = date('j F Y г. в H:i');

$html_body = "
<div style=\"font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px; margin: 0 auto;\">
  <div style=\"text-align: center; padding: 20px 0; border-bottom: 1px solid #eaeaea;\">
    <h1 style=\"color: #7A7ADB; margin: 0;\">AI Tracking</h1>
    <p style=\"color: #666; margin: 5px 0 0 0;\">Новая заявка на демонстрацию</p>
  </div>
  
  <div style=\"padding: 20px 0;\">
    <h2 style=\"color: #333; margin-top: 0;\">📝 Детали заявки:</h2>
    
    <div style=\"background: #f8f9fa; border-left: 4px solid #7A7ADB; padding: 20px; margin: 20px 0;\">
      <p style=\"margin: 0 0 10px 0;\"><strong>Имя:</strong> {$name}</p>
      <p style=\"margin: 0 0 10px 0;\"><strong>Email:</strong> <a href=\"mailto:{$email}\" style=\"color: #7A7ADB;\">{$email}</a></p>
      <p style=\"margin: 0 0 10px 0;\"><strong>Телефон:</strong> <a href=\"tel:{$phone}\" style=\"color: #7A7ADB;\">{$phone}</a></p>
      
      " . ($date ? "<p style=\"margin: 0 0 10px 0;\"><strong>Предпочтительная дата:</strong> {$date}</p>" : "") . "
      " . ($time ? "<p style=\"margin: 0 0 10px 0;\"><strong>Предпочтительное время:</strong> {$time}</p>" : "") . "
      
      <p style=\"margin: 0;\"><strong>Дата подачи заявки:</strong> {$request_date}</p>
    </div>
    
    " . ($comment ? "
    <div style=\"background: #fff; border: 1px solid #eaeaea; padding: 20px; border-radius: 8px; margin: 20px 0;\">
      <h3 style=\"color: #333; margin-top: 0;\">💬 Комментарий:</h3>
      <p style=\"color: #666; line-height: 1.6; margin: 0;\">{$comment}</p>
    </div>
    " : "") . "
    
    <div style=\"background: #e8f4f8; border: 1px solid #7A7ADB; padding: 20px; border-radius: 8px; margin: 20px 0;\">
      <h3 style=\"color: #333; margin-top: 0;\">🎯 Рекомендуемые действия:</h3>
      <ul style=\"color: #666; line-height: 1.6; margin: 0;\">
        <li>Связаться с клиентом в течение 2 часов</li>
        <li>Подготовить персональную демонстрацию</li>
        <li>Отправить календарную ссылку для записи</li>
        <li>Подготовить материалы о продукте</li>
      </ul>
    </div>
    
    <div style=\"text-align: center; padding: 20px 0; border-top: 1px solid #eaeaea; margin-top: 30px;\">
      <p style=\"color: #999; font-size: 12px; margin: 0;\">
        Заявка отправлена с сайта<br>
        <a href=\"https://aitracking.app\" style=\"color: #7A7ADB;\">aitracking.app</a>
      </p>
    </div>
  </div>
</div>
";

$text_body = "
AI Tracking - Новая заявка на демонстрацию

Детали заявки:
Имя: {$name}
Email: {$email}
Телефон: {$phone}
" . ($date ? "Предпочтительная дата: {$date}\n" : "") . "
" . ($time ? "Предпочтительное время: {$time}\n" : "") . "
Дата подачи заявки: {$request_date}

" . ($comment ? "Комментарий:\n{$comment}\n\n" : "") . "

Рекомендуемые действия:
• Связаться с клиентом в течение 2 часов
• Подготовить персональную демонстрацию  
• Отправить календарную ссылку для записи
• Подготовить материалы о продукте

---
Заявка отправлена с сайта https://aitracking.app
";

// Create email headers
$boundary = uniqid('boundary_');
$headers = [
    "MIME-Version: 1.0",
    "Content-Type: multipart/alternative; boundary=\"{$boundary}\"",
    "From: {$smtp_from_name} <{$smtp_from}>",
    "Reply-To: {$email}",
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

$success = mail(
    $recipient_email,
    $subject,
    $email_body,
    implode("\r\n", $headers)
);

if ($success) {
    echo json_encode([
        'success' => true,
        'message' => 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Ошибка отправки заявки. Попробуйте позже.',
        'debug' => error_get_last()
    ]);
}
?> 