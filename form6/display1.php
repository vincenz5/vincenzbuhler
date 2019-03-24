<?php
  // The global $_POST variable allows you to access the data sent with the POST method by name
  // To access the data sent with the GET method, you can use $_GET
  $venue = htmlspecialchars($_POST['venue']);
  $date  = htmlspecialchars($_POST['date']);
  $time = htmlspecialchars($_POST['venue']);
  $postcode  = htmlspecialchars($_POST['date']);

  echo  $venue, ' ', $date;
?>



$venue = $_POST['venue'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $postcode = $_POST['postcode'];