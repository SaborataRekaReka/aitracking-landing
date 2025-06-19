<?php
// Advanced promo code sender using PHPMailer
// This version requires PHPMailer: composer require phpmailer/phpmailer

require_once 'vendor/autoload.php'; // Uncomment if using Composer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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

try {
    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.mail.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'order@aitracking.app';
    $mail->Password = 'ffBs89e1wezVn4TdHBtn';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    // Email settings
    $mail->setFrom('order@aitracking.app', 'AI Tracking');
    $mail->addAddress($email);
    $mail->addReplyTo('order@aitracking.app', 'AI Tracking');

    // Email content
    $to_name = explode('@', $email)[0];
    $expiry_date = date('j F Y г. в H:i', strtotime('+30 days'));
    
    $mail->isHTML(true);
    $mail->Subject = "Ваш промокод AI Tracking: {$promo_code}";
    
    $mail->Body = "
    <div style=\"font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px; margin: 0 auto;\">
      <div style=\"text-align: center; padding: 20px 0; border-bottom: 1px solid #eaeaea;\">
        <h1 style=\"color: #667eea; margin: 0;\">AI Tracking</h1>
      </div>
      
      <div style=\"padding: 20px 0;\">
        <p style=\"padding-top: 14px; border-top: 1px solid #eaeaea; margin-top: 20px;\">
          Привет, <strong>{$to_name}</strong>!<br><br>
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

    $mail->AltBody = "
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

    // Send email
    $mail->send();
    
    echo json_encode([
        'success' => true,
        'message' => 'Промокод успешно отправлен на ваш email',
        'promo_code' => $promo_code
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Ошибка отправки email: ' . $mail->ErrorInfo,
        'debug' => $e->getMessage()
    ]);
}
?> 