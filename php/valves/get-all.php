<?php
include_once("../database.php");

$query = "SELECT valves.*, wells.name AS well FROM valves JOIN wells ON valves.id_well = wells.id";
$result = mysqli_query($connection, $query);
if (!$result) {
  die("Consulta fallida" . mysqli_error($connection));
}

$data = array();
while ($row = mysqli_fetch_array($result)) {
  $data[] = array(
    "id" => $row["id"],
    "name" => $row["name"],
    "well" => $row["well"]
  );
}

$json = json_encode($data);
echo $json;
