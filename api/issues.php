<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Get query parameters
    $status = $_GET['status'] ?? '';
    $priority = $_GET['priority'] ?? '';
    $type = $_GET['type'] ?? '';
    $search = $_GET['search'] ?? '';
    $limit = $_GET['limit'] ?? 50;
    $offset = $_GET['offset'] ?? 0;
    
    // Build query
    $where_conditions = [];
    $params = [];
    
    if (!empty($status)) {
        $where_conditions[] = "status = :status";
        $params[':status'] = $status;
    }
    
    if (!empty($priority)) {
        $where_conditions[] = "priority = :priority";
        $params[':priority'] = $priority;
    }
    
    if (!empty($type)) {
        $where_conditions[] = "type = :type";
        $params[':type'] = $type;
    }
    
    if (!empty($search)) {
        $where_conditions[] = "(title LIKE :search OR description LIKE :search)";
        $params[':search'] = '%' . $search . '%';
    }
    
    $where_clause = !empty($where_conditions) ? 'WHERE ' . implode(' AND ', $where_conditions) : '';
    
    $query = "
        SELECT id, title, description, type, priority, status, component, 
               reporter_name, reporter_email, created_at, updated_at
        FROM issues 
        {$where_clause}
        ORDER BY created_at DESC 
        LIMIT :limit OFFSET :offset
    ";
    
    $stmt = $db->prepare($query);
    
    // Bind parameters
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
    
    $stmt->execute();
    $issues = $stmt->fetchAll();
    
    // Get total count for pagination
    $count_query = "SELECT COUNT(*) as total FROM issues {$where_clause}";
    $count_stmt = $db->prepare($count_query);
    foreach ($params as $key => $value) {
        $count_stmt->bindValue($key, $value);
    }
    $count_stmt->execute();
    $total = $count_stmt->fetch()['total'];
    
    echo json_encode([
        'success' => true,
        'issues' => $issues,
        'total' => $total,
        'limit' => $limit,
        'offset' => $offset
    ]);
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error loading issues: ' . $e->getMessage()
    ]);
}
?>
