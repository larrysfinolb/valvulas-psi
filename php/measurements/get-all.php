<?php
include_once("../database.php");

$query = "SELECT measurements.*, valves.name AS valve FROM measurements JOIN valves ON measurements.id_valve = valves.id";
$result = mysqli_query($connection, $query);
if (!$result) {
  die("Consulta fallida" . mysqli_error($connection));
}

$data = array();
while ($row = mysqli_fetch_array($result)) {
  $data[] = array(
    "id" => $row["id"],
    "valve" => $row["valve"],
    "id_valve" => $row["id_valve"],
    "date" => $row["date"],
    "psi" => $row["psi"]
  );
}

$json = json_encode($data);
echo $json;
