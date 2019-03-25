<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
        
    // $conn = '';
    // $query = '';
    // $dbconn = '';


    $host = "localhost"; // Host name 
    $username = "vincenzb_v"; // Mysql username 
    $password = "passwords"; // Mysql password 
    $db_name = "vincenzb_1"; // Database name 
    // Connect to server and select databse. 
    // Create connection
    $conn = new mysqli($host, $username, $password, $db_name);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        } 

    $dbconn = mysqli_connect($host, $username, $password)or die("cannot connect");
    mysqli_select_db($dbconn, $db_name) or die("cannot select DB"); 

    // $venue= 's';
    // $date='e';
    // $time='x';
    // $postcode='y';

    $venue = $conn->real_escape_string($_POST['venue']);
    $date = $conn->real_escape_string($_POST['date']);
    $time = $conn->real_escape_string($_POST['time']);
    $postcode = $conn->real_escape_string($_POST['postcode']);

    // mysqli_real_escape_string($venue, $date, $time, $postcode);

    $query = "INSERT INTO concert (`venue`, `date`, `time`, `postcode`) VALUES ('$venue', '$date', '$time', '$postcode')";

    mysqli_query($conn, $query);

 // This will print whatever the user entered into the form.html page.
 $name = filter_input(INPUT_GET, 'venue', FILTER_SANITIZE_STRING);
 echo "Enjoy ". $name ."!";

    if(isset($_POST['submit'])) {
        echo "thanks";
    }
?>