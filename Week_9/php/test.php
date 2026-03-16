<?php

// include database connection file
include "db.php";

echo "<h1>Docker PHP is working!</h1>";
echo "<p>This is running inside Apache container.</p>";

// check if connection exists
if ($conn) {//$conn connection variable came from db.php

    echo "<p><h1>Database connected successfully too.</h1></p>";

}



?>
