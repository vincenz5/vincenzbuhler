<?php
$username="vincenzb_form";
$password="B;B%C_aduT7{";
$database="vincenzb_form";
/////////////////

if(isset($_POST['save']))

{
    $sql = "INSERT INTO users (username, $password, email)
    VALUES ('".$_POST["username"]."','".$_POST["password"]."','".$_POST["email"]."')";

    $result = mysqli_query($conn,$sql);
}



$conn=mysqli_connect("localhost","root","password","testDB");

if(!$conn)
{
die("Connection failed: " . mysqli_connect_error());
}



//////////////////////////
$mysqli = new mysqli("localhost", $username, $password, $database);

$mysqli->select_db($database) or die( "Unable to select database");

$mysqli->execute();
// $mysqli->close();

?>