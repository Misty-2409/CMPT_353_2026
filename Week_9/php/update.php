<?php

include "db.php";

// get id
$id = $_GET['id'];

// if form submitted
if (isset($_POST['name'])) {

    $name = $_POST['name'];

    $sql = "UPDATE users SET name='$name' WHERE id=$id";

    mysqli_query($conn, $sql);

    header("Location: index.php");
}

// get current user data
$sql = "SELECT * FROM users WHERE id=$id";
$result = mysqli_query($conn, $sql);
$user = mysqli_fetch_assoc($result);

?>

<h2>Edit User</h2>

<form method="POST">

Name:
<input type="text" name="name" value="<?php echo $user['name']; ?>">

<button type="submit">Update</button>

</form>