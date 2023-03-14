<?php
include_once("../database.php");

if (
  isset($_GET["startDate"]) && !empty($_GET["startDate"]) && isset($_GET["endDate"]) && !empty($_GET["endDate"])  &&
  isset($_GET['valve']) && !empty($_GET['valve']) && is_numeric($_GET['valve'])
) {
  $valve = $_GET['valve'];
  $startDate = $_GET["startDate"];
  $endDate = $_GET["endDate"];

  $query = "SELECT * FROM measurements WHERE id_valve = $valve AND date BETWEEN '$startDate' AND '$endDate'";

  $result = mysqli_query($connection, $query);
  if (!$result) {
    die("Consulta fallida" . mysqli_error($connection));
  }

  $data = array();
  while ($row = mysqli_fetch_array($result)) {
    $data[] = array(
      "id" => $row["id"],
      "psi" => $row["psi"],
      "date" => $row["date"]
    );
  }

  $json = json_encode($data);
  echo $json;
} else {
  echo "Error: No se han recibido los parámetros necesarios";
}
