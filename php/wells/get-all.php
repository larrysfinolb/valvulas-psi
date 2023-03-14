<?php
include_once("../database.php");

$query = "SELECT * FROM wells";
$result = mysqli_query($connection, $query);
if(!$result) {
    die("Consulta fallida" . mysqli_error($connection));
} 

$data = array();
while($row = mysqli_fetch_array($result)) {
    $data[] = array(
        "id" => $row["id"],
        "name" => $row["name"],
        "location" => $row["location"]
    );
}

$json = json_encode($data);
echo $json;
