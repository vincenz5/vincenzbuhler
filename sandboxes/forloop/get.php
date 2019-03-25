<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        //Ok we got a POST, probably from a FORM, read from $_POST.
        var_dump($_PSOT); //Use this to see what info we got!
    }
    else
    {
       //You could assume you got a GET
       var_dump($_GET); //Use this to see what info we got!
    }
 ?>