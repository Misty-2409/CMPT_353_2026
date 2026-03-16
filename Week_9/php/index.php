<?php

// connect database
include "db.php";

// select all users
$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);

?>
<link rel="stylesheet" href="style.css">

<h2>User Management (CRUD Demo)</h2>

<!-- CREATE USER -->

<h3>Add New User</h3>

<form action="insert.php" method="POST">

Name:
<input type="text" name="name" required>

<button type="submit">Create</button>

</form>

<br><br>

<!-- USERS TABLE -->

<h3>Users List</h3>

<table border="1" cellpadding="10">

<tr>
<th>ID</th>
<th>Name</th>
<th>Actions</th>
</tr>

<?php

while ($row = mysqli_fetch_assoc($result)) {

?>

<tr>

<td><?php echo $row['id']; ?></td>

<td><?php echo $row['name']; ?></td>

<td>

<!-- EDIT BUTTON -->

<form action="update.php" method="GET" style="display:inline;">
<input type="hidden" name="id" value="<?php echo $row['id']; ?>">
<button type="submit">Edit</button>
</form>

<!-- DELETE BUTTON -->

<form action="delete.php" method="GET" style="display:inline;">
<input type="hidden" name="id" value="<?php echo $row['id']; ?>">
<button type="submit">Delete</button>
</form>

</td>

</tr>

<?php
}
?>

</table>