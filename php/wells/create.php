<?php
include_once("../database.php");

if (isset($_POST['name']) && isset($_POST["location"]) && !empty($_POST['name']) && !empty($_POST['location'])) {

  $name = $_POST['name'];
  $location = $_POST['location'];

  $query = "INSERT INTO wells(name, location) VALUES ('$name', '$location')";
  $result = mysqli_query($connection, $query);

  if (!$result) {
    die("Consulta fallida" . mysqli_error($connection));
  }

  echo "Pozo registrado exitosamente";
} else {
  die("Error: El nombre y la localización son requeridos");
}
