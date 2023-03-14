<?php
include_once("../database.php");

if (isset($_GET['well']) && !empty($_GET['well']) && is_numeric($_GET['well'])) {
  $well = $_GET['well'];

  $query = "SELECT * FROM valves WHERE valves.id_well = $well";
  $result = mysqli_query($connection, $query);
  if (!$result) {
    die("Consulta fallida" . mysqli_error($connection));
  }

  $data = array();
  while ($row = mysqli_fetch_array($result)) {
    $data[] = array(
      "id" => $row["id"],
      "id_well" => $row["id_well"],
      "name" => $row["name"]
    );
  }

  $json = json_encode($data);
  echo $json;
}
