<?php
include_once("../database.php");

if (isset($_GET['valve']) && !empty($_GET['valve']) && is_numeric($_GET['valve'])) {
  $valve = $_GET['valve'];

  $query = "SELECT measurements.*, valves.name AS valve FROM measurements JOIN valves ON measurements.id_valve = valves.id WHERE measurements.id_valve = $valve";
  $result = mysqli_query($connection, $query);
  if (!$result) {
    die("Consulta fallida" . mysqli_error($connection));
  }

  $data = array();
  while ($row = mysqli_fetch_array($result)) {
    $data[] = array(
      "id" => $row["id"],
      "id_valve" => $row["id_valve"],
      "valve" => $row["valve"],
      "psi" => $row["psi"],
      "date" => $row["date"]
    );
  }

  $json = json_encode($data);
  echo $json;
}
