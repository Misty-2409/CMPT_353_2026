<?php

// include database connection
include "db.php";

// check if form was submitted
if (isset($_POST['name'])) {

    // get the name from form
    $name = $_POST['name'];

    // SQL insert query
    $sql = "INSERT INTO users (name) VALUES ('$name')";

    // execute query
    mysqli_query($conn, $sql);

    // redirect back to index page
    header("Location: index.php");

}

?>