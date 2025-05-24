CREATE DATABASE IF NOT EXISTS soblend_issues;
USE soblend_issues;

CREATE TABLE IF NOT EXISTS issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('bug', 'feature', 'enhancement', 'documentation', 'security', 'performance') NOT NULL,
    priority ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    status ENUM('open', 'in-progress', 'resolved', 'closed') DEFAULT 'open',
    component VARCHAR(100),
    reporter_name VARCHAR(100),
    reporter_email VARCHAR(100),
    environment TEXT,
    steps_reproduce TEXT,
    expected_behavior TEXT,
    actual_behavior TEXT,
    assigned_to VARCHAR(100),
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_type (type),
    INDEX idx_created (created_at)
);

-- Insert sample data
INSERT INTO issues (title, description, type, priority, status, component, reporter_name, reporter_email) VALUES
('Terminal crashes on startup', 'The terminal application crashes immediately when trying to start on Windows 11', 'bug', 'high', 'open', 'terminal', 'John Doe', 'john@example.com'),
('Add dark theme support', 'Request for a dark theme option in the settings', 'feature', 'medium', 'in-progress', 'ui', 'Jane Smith', 'jane@example.com'),
('Package manager slow performance', 'Package installation takes too long compared to other tools', 'performance', 'medium', 'open', 'package-manager', 'Bob Wilson', 'bob@example.com'),
('Security vulnerability in auth', 'Potential security issue found in authentication module', 'security', 'critical', 'resolved', 'security', 'Security Team', 'security@soblend.io'),
('Documentation missing for API', 'API documentation is incomplete and needs updates', 'documentation', 'low', 'open', 'other', 'Dev Team', 'dev@soblend.io');
