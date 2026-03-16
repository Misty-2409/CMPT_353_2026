<?php

include "db.php";

// get user id from button
$id = $_GET['id'];

// delete query
$sql = "DELETE FROM users WHERE id=$id";

// execute query
mysqli_query($conn, $sql);

// go back to main page
header("Location: index.php");

?>