<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid issue ID']);
    exit;
}

try {
    $database = new Database();
    $db = $database->getConnection();
    
    $issue_id = (int)$_GET['id'];
    
    $query = "
        SELECT id, title, description, type, priority, status, component,
               reporter_name, reporter_email, environment, steps_reproduce,
               expected_behavior, actual_behavior, assigned_to, resolution_notes,
               created_at, updated_at, resolved_at
        FROM issues 
        WHERE id = :id
    ";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $issue_id, PDO::PARAM_INT);
    $stmt->execute();
    
    $issue = $stmt->fetch();
    
    if ($issue) {
        echo json_encode([
            'success' => true,
            'issue' => $issue
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Issue not found'
        ]);
    }
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error loading issue details: ' . $e->getMessage()
    ]);
}
?>
