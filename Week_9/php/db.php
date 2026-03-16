<?php

// Database host
// IMPORTANT: we use "db" because that is the service name in docker-compose
$host = "db";

// MySQL username
$user = "root";

// MySQL password
$password = "hello";

// Database name
$database = "apache_db";

// Create connection
$conn = mysqli_connect($host, $user, $password, $database);

// Check connection
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

// If connected successfully
//echo "Database connected successfully";

?>