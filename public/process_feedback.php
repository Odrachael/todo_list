<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate form fields
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["feedback"]);

    // Check if required fields are not empty
    if (empty($name) || empty($email) || empty($message)) {
        echo "Error: Please fill out all required fields.";
    } else {
        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Error: Invalid email format.";
        } else {
            // Set up email parameters
            $to = "Odudurachael1@gmail.com"; // Your email address
            $subject = "Client Feedback";
            $body = "Name: $name\nEmail: $email\nMessage:\n$message";

            // Send email
            if (mail($to, $subject, $body)) {
                echo "Feedback submitted successfully. Thank you!";
            } else {
                echo "Error: Unable to submit feedback. Please try again later.";
            }
        }
    }
}
?>

