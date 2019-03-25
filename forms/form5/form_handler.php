<?php
 // This will print whatever the user entered into the form.html page.
 $name = filter_input(INPUT_GET, 'firstname', FILTER_SANITIZE_STRING);
 echo "Hello, ". $name ."!";
?>