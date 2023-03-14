<?php
include_once("../database.php");

echo $_POST['name'];
echo $_POST['well'];

if (isset($_POST['name']) && isset($_POST["well"]) && !empty($_POST['name']) && !empty($_POST['well']) && is_numeric($_POST['well'])) {

  $name = $_POST['name'];
  $well = $_POST['well'];

  $query = "INSERT INTO valves(id_well, name) VALUES ($well, '$name')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die("Consulta fallida" . mysqli_error($connection));
  }

  echo "Valvula registrada exitosamente";
} else {
  die("Error: El nombre y el pozo son requeridos");
}
