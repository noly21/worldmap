<?php
    $conn = new mysqli("localhost", "root", "", "worldmap");

    $user = $_POST['username'];
    $pass = $_POST['password'];

    $sql = "SELECT * FROM tbl_user WHERE username = '$user' AND password = '$pass' LIMIT 1";
		 
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $role = '';
        while($row = $result->fetch_assoc()) {
            $role = $row['role'];
        }
        echo json_encode(
           array(
                'status' => 'matched',
                'role' => $role
           )
        );
    } else {
        echo json_encode(
            array(
                'status' => 'notmatched'
            )
        );
    }
?>