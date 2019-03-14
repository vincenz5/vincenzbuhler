<?php
$username="vincenzb";
$password="B;B%C_aduT7{";
$database="vincenzb_form";

$mysqli = new mysqli("localhost", $username, $password, $database);

$mysqli->select_db($vincenzb_form) or die( "Unable to select database");

// $mysqli->close();

?>