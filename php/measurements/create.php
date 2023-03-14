<?php
include_once("../database.php");

if (isset($_POST['valve']) && isset($_POST["psi"]) && !empty($_POST['valve']) && !empty($_POST['psi']) && is_numeric($_POST['valve']) && is_numeric($_POST['psi'])) {

  $valve = $_POST['valve'];
  $psi = $_POST['psi'];

  date_default_timezone_set('America/Caracas');
  $date = date('Y-m-d H:i:s', strtotime('now'));

  $query = "INSERT INTO measurements(id_valve, psi, date) VALUES ($valve, $psi, '$date')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die("Consulta fallida" . mysqli_error($connection));
  }

  echo "Valvula registrada exitosamente";
} else {
  die("Error: El nombre y el pozo son requeridos");
}
