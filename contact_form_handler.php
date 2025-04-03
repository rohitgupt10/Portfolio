<?php
// Contact form handler

// Define variables and set to empty values
$name = $email = $phone = $message = "";
$error = false;
$error_message = "";
$success_message = "";

// Check if this is an AJAX request
$is_ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

// Process form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate name
    if (empty($_POST["name"])) {
        $error = true;
        $error_message .= "Name is required. ";
    } else {
        $name = test_input($_POST["name"]);
        // Check if name only contains letters and whitespace
        if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
            $error = true;
            $error_message .= "Only letters and white space allowed in name. ";
        }
    }
    
    // Validate email
    if (empty($_POST["email"])) {
        $error = true;
        $error_message .= "Email is required. ";
    } else {
        $email = test_input($_POST["email"]);
        // Check if email address is well-formed
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = true;
            $error_message .= "Invalid email format. ";
        }
    }
    
    // Validate phone number
    if (empty($_POST["phone"])) {
        $error = true;
        $error_message .= "Phone number is required. ";
    } else {
        $phone = test_input($_POST["phone"]);
        // Simple phone validation - you might want to use a more sophisticated check based on your requirements
        if (!preg_match("/^[0-9+\-\s()]*$/", $phone)) {
            $error = true;
            $error_message .= "Invalid phone number format. ";
        }
    }
    
    // Validate message
    if (empty($_POST["message"])) {
        $error = true;
        $error_message .= "Message is required. ";
    } else {
        $message = test_input($_POST["message"]);
    }
    
    // If no errors, send email
    if (!$error) {
        // Recipient email address
        $to = "binaygupta191@gmail.com";
        
        // Subject
        $subject = "New Message from Portfolio: " . $name;
        
        // Message content
        $email_content = "Name: " . $name . "\r\n";
        $email_content .= "Email: " . $email . "\r\n";
        $email_content .= "Phone: " . $phone . "\r\n\r\n";
        $email_content .= "Message:\r\n" . $message . "\r\n";
        
        // Email headers
        $headers = "From: " . $email . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Attempt to send email
        if (mail($to, $subject, $email_content, $headers)) {
            $success_message = "Your message has been sent successfully!";
            
            // Reset form values on success
            $name = $email = $phone = $message = "";
        } else {
            $error = true;
            $error_message = "Oops! Something went wrong and we couldn't send your message.";
        }
    }
    
    // If this is an AJAX request, return JSON response
    if ($is_ajax) {
        header('Content-Type: application/json');
        if ($error) {
            echo json_encode(['success' => false, 'message' => $error_message]);
        } else {
            echo json_encode(['success' => true, 'message' => $success_message]);
        }
        exit;
    }
}

// Function to sanitize input data
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Only show HTML if this is not an AJAX request
if (!$is_ajax):
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Form Submission - Binay Gupta Portfolio</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <link rel="stylesheet" href="css/open-iconic-bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
    <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target" id="ftco-navbar">
	    <div class="container">
	      <a class="navbar-brand" href="index.html">Portfolio</a>
	      <button class="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="oi oi-menu"></span> Menu
	      </button>

	      <div class="collapse navbar-collapse" id="ftco-nav">
	        <ul class="navbar-nav nav ml-auto">
	          <li class="nav-item"><a href="index.html#home-section" class="nav-link"><span>Home</span></a></li>
	          <li class="nav-item"><a href="index.html#about-section" class="nav-link"><span>About</span></a></li>
	          <li class="nav-item"><a href="index.html#resume-section" class="nav-link"><span>Resume</span></a></li>
	          <li class="nav-item"><a href="index.html#project-section" class="nav-link"><span>Projects</span></a></li>
	          <li class="nav-item"><a href="index.html#contact-section" class="nav-link"><span>Contact</span></a></li>
	        </ul>
	      </div>
	    </div>
	</nav>
    
    <section class="ftco-section contact-section ftco-no-pb" style="padding-top: 150px;">
        <div class="container">
            <div class="row justify-content-center mb-5 pb-3">
                <div class="col-md-7 heading-section text-center ftco-animate">
                    <h2 class="mb-4">Contact Form Submission</h2>
                    <?php if ($error): ?>
                        <div class="alert alert-danger">
                            <p><?php echo $error_message; ?></p>
                            <p><a href="index.html#contact-section" class="btn btn-primary py-3 px-5">Go Back</a></p>
                        </div>
                    <?php elseif ($success_message): ?>
                        <div class="alert alert-success">
                            <p><?php echo $success_message; ?></p>
                            <p><a href="index.html" class="btn btn-primary py-3 px-5">Return to Homepage</a></p>
                        </div>
                    <?php else: ?>
                        <div class="alert alert-info">
                            <p>Processing your submission...</p>
                            <p><a href="index.html" class="btn btn-primary py-3 px-5">Return to Homepage</a></p>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    
</body>
</html>
<?php endif; ?> 