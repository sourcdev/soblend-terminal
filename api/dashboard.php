<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Get statistics
    $stats = [];
    
    // Total issues
    $stmt = $db->query("SELECT COUNT(*) as total FROM issues");
    $stats['total'] = $stmt->fetch()['total'];
    
    // Open issues
    $stmt = $db->query("SELECT COUNT(*) as open FROM issues WHERE status = 'open'");
    $stats['open'] = $stmt->fetch()['open'];
    
    // Resolved issues
    $stmt = $db->query("SELECT COUNT(*) as resolved FROM issues WHERE status = 'resolved'");
    $stats['resolved'] = $stmt->fetch()['resolved'];
    
    // High priority issues
    $stmt = $db->query("SELECT COUNT(*) as high_priority FROM issues WHERE priority = 'high' OR priority = 'critical'");
    $stats['high_priority'] = $stmt->fetch()['high_priority'];
    
    // Get recent issues (last 10)
    $stmt = $db->query("
        SELECT id, title, description, type, priority, status, component, 
               reporter_name, created_at 
        FROM issues 
        ORDER BY created_at DESC 
        LIMIT 10
    ");
    $recent_issues = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'stats' => $stats,
        'recent_issues' => $recent_issues
    ]);
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error loading dashboard: ' . $e->getMessage()
    ]);
}
?>
