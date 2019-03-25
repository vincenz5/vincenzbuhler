<?php
    // error_reporting(E_ALL);
    // ini_set('display_errors', 1);
    
    
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

    $name = $conn->real_escape_string($_POST['name']);
    $industry = $conn->real_escape_string($_POST['industry']);
    $contact = $conn->real_escape_string($_POST['contact']);
    $location = $conn->real_escape_string($_POST['location']);

    // mysqli_real_escape_string($venue, $date, $time, $postcode);

    $query = "INSERT INTO contacts (`name`, `industry`, `contact`, `location`) VALUES ('$name', '$industry', '$contact', '$location')";

    mysqli_query($conn, $query);

 // This will print whatever the user entered into the index.html page.
 $name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);
 echo "<p style='font-size:20px;margin-top:20px;margin-left:30px;'>Thank you for your submission,". $_POST['name'] ."! I will be in touch soon. </p> <br>";

 echo "<form action='result.php' method='post'>
         <input type='submit' name='someAction' value='Check Out Other Contacts' style='margin-top:50px; margin-left:30px;     
         background-color: rgb(89, 89, 226); /* Green */
         border: none;
         color: white;
         padding: 15px 32px;
         text-align: center;
         text-decoration: none;
         display: inline-block;
         font-size: 30px;
         border-radius: 8px;
         margin-bottom:2px;' />
     </form>";

 echo "<a href='http://vincenzbuhler.com' style='color:white;'>
 <button style='margin-top:50px; margin-left:30px;     
   background-color: rgb(89, 89, 226); /* Green */
   border: none;
   color: white;
   padding: 15px 32px;
   text-align: center;
   text-decoration: none;
   display: inline-block;
   font-size: 30px;
   border-radius: 8px;
   margin-bottom:2px;'>Back to Homepage
 </button>
</a>
</p>";

    // if(isset($_POST['submit'])) {
    //     echo "thanks";
    // }
?>