<?php
    
    $conn = new mysqli("localhost", "root", "", "worldmap");

    $sql = "SELECT latitude, longitude, title FROM tbl_map WHERE status = 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $value = array();

        while($row = $result->fetch_assoc()) {
            $value[] = $row;
        }
        echo json_encode($value);
    } else {
        echo "0 results";
    }


?>