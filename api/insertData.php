

<?php 
    $conn = new mysqli("localhost", "root", "", "worldmap");

    $lat = $_POST['latitude'];
	$long = $_POST['longitude'];
	$title = $_POST['title'];
    $share = $_POST['share'];

	$sql = "INSERT INTO tbl_map(latitude, longitude, title, status) 
	VALUES ('$lat','$long','$title','$share')";

	if (mysqli_query($conn, $sql)) {
		echo json_encode(array("status"=>"inserted"));
	} 
	else {
		echo json_encode(array("status"=>"failed"));
	}
?>