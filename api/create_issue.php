<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Validate required fields
    $required_fields = ['title', 'description', 'type', 'priority'];
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            echo json_encode([
                'success' => false, 
                'message' => "Field '{$field}' is required"
            ]);
            exit;
        }
    }
    
    // Sanitize and validate input
    $title = trim($_POST['title']);
    $description = trim($_POST['description']);
    $type = $_POST['type'];
    $priority = $_POST['priority'];
    $component = $_POST['component'] ?? null;
    $reporter_name = trim($_POST['reporter_name'] ?? '');
    $reporter_email = trim($_POST['reporter_email'] ?? '');
    $environment = trim($_POST['environment'] ?? '');
    $steps_reproduce = trim($_POST['steps_reproduce'] ?? '');
    $expected_behavior = trim($_POST['expected_behavior'] ?? '');
    $actual_behavior = trim($_POST['actual_behavior'] ?? '');
    
    // Validate enums
    $valid_types = ['bug', 'feature', 'enhancement', 'documentation', 'security', 'performance'];
    $valid_priorities = ['low', 'medium', 'high', 'critical'];
    
    if (!in_array($type, $valid_types)) {
        echo json_encode(['success' => false, 'message' => 'Invalid issue type']);
        exit;
    }
    
    if (!in_array($priority, $valid_priorities)) {
        echo json_encode(['success' => false, 'message' => 'Invalid priority level']);
        exit;
    }
    
    // Validate email if provided
    if (!empty($reporter_email) && !filter_var($reporter_email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Insert issue
    $query = "
        INSERT INTO issues (
            title, description, type, priority, component, reporter_name, 
            reporter_email, environment, steps_reproduce, expected_behavior, 
            actual_behavior, status
        ) VALUES (
            :title, :description, :type, :priority, :component, :reporter_name,
            :reporter_email, :environment, :steps_reproduce, :expected_behavior,
            :actual_behavior, 'open'
        )
    ";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':priority', $priority);
    $stmt->bindParam(':component', $component);
    $stmt->bindParam(':reporter_name', $reporter_name);
    $stmt->bindParam(':reporter_email', $reporter_email);
    $stmt->bindParam(':environment', $environment);
    $stmt->bindParam(':steps_reproduce', $steps_reproduce);
    $stmt->bindParam(':expected_behavior', $expected_behavior);
    $stmt->bindParam(':actual_behavior', $actual_behavior);
    
    if ($stmt->execute()) {
        $issue_id = $db->lastInsertId();
        
        // Send notification email if configured
        if (!empty($reporter_email)) {
            sendNotificationEmail($reporter_email, $issue_id, $title);
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Issue created successfully',
            'issue_id' => $issue_id
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error creating issue'
        ]);
    }
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error creating issue: ' . $e->getMessage()
    ]);
}

function sendNotificationEmail($email, $issue_id, $title) {
    // Simple email notification (configure SMTP as needed)
    $subject = "Soblend Terminal Issue #$issue_id Created";
    $message = "Your issue '$title' has been created with ID #$issue_id. We'll keep you updated on its progress.";
    $headers = "From: noreply@soblend.io\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Uncomment to enable email notifications
    // mail($email, $subject, $message, $headers);
}
?>
