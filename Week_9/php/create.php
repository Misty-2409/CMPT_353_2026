<?php

include "db.php";

$sql = "CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
)";

if (mysqli_query($conn, $sql)) {

    echo "Students table created successfully";

} else {

    echo "Table already exists or error";

}

?>