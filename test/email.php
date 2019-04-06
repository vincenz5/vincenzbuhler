

<?php
    
    if($_POST["submit"]) {
        $firstname = $POST['firstname'];
        $lastname = $POST['lastname'];
        $companyname = $POST['companyname'];
        $location = $POST['location'];
        $subject = $POST['subject'];
    
        if(empty($firstname)||empty(subject))
        {
            echo "Need your name and a message to submit!";
            exit;
        }
    
        if($_POST["subject"]) {
            mail("vincenz@wattwatt.io", "Form to email message", $_POST["subject"], "From: an@email.address");
            $thankYou="<p>Thank you! Your message has been sent.</p>";
        }
    }
    ?>