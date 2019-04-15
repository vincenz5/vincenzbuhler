<?php
    // error_reporting(E_ALL);
    // ini_set('display_errors', 1);
    
    
    // $conn = '';
    // $query = '';
    // $dbconn = '';


    $host = "localhost"; // Host name 
    $username = "vincenzb_wwv"; // Mysql username 
    $password = "passwords"; // Mysql password 
    $db_name = "vincenzb_ww"; // Database name 
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

    $first = $conn->real_escape_string($_POST['first']);
    $last = $conn->real_escape_string($_POST['last']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);
    $cpassword = $conn->real_escape_string($_POST['cpassword']);

    // mysqli_real_escape_string($venue, $date, $time, $postcode);

    $query = "INSERT INTO signup (`first`, `last`, `email`, `password`, `cpassword`) VALUES ('$first', '$last', '$email', '$password', '$cpassword')";

    mysqli_query($conn, $query);

 // This will print whatever the user entered into the index.html page.
 $first = filter_input(INPUT_GET, 'first', FILTER_SANITIZE_STRING);
 echo "<p style='font-size:20px;margin-top:20px;margin-left:30px;'>Thank you for your submission,". $_POST['first'] ."! We will be in touch soon. </p> <br>";

 echo 
 "<div class='all-post text-center col-lg-12'>
 <a class='btn btn-main' href='/test'>Return</a>
</div>";


?>