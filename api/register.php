<?php
    $conn = new mysqli("localhost", "root", "", "worldmap");

    $user = $_POST['username'];
    $pass = $_POST['password'];
    $role = 2;

	$sql = "INSERT INTO tbl_user(username, password, role) 
	VALUES ('$user','$pass','$role')";

	if (mysqli_query($conn, $sql)) {
		echo json_encode(array("status"=>"inserted"));
	} 
	else {
		echo json_encode(array("status"=>"failed"));
	}
    
?>