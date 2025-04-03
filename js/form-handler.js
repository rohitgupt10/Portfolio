$(document).ready(function () {
  // Handle contact form submission
  $(".contact-form").submit(function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    var formData = $(this).serialize();
    var $form = $(this);
    var $submitButton = $form.find('input[type="submit"]');
    var originalButtonText = $submitButton.val();

    // Change button text to show loading state
    $submitButton.val("Sending...");
    $submitButton.prop("disabled", true);

    // Create status message container if it doesn't exist
    if ($form.find(".form-status").length === 0) {
      $form.append('<div class="form-status mt-4"></div>');
    }
    var $statusContainer = $form.find(".form-status");

    // Send AJAX request
    $.ajax({
      type: "POST",
      url: "contact_form_handler.php",
      data: formData,
      dataType: "json",
      success: function (response) {
        // Reset button
        $submitButton.val(originalButtonText);
        $submitButton.prop("disabled", false);

        if (response.success) {
          // Show success message
          $statusContainer.html(
            '<div class="alert alert-success">' + response.message + "</div>"
          );

          // Reset form fields
          $form[0].reset();

          // Hide success message after 5 seconds
          setTimeout(function () {
            $statusContainer.html("");
          }, 5000);
        } else {
          // Show error message
          $statusContainer.html(
            '<div class="alert alert-danger">' + response.message + "</div>"
          );
        }
      },
      error: function () {
        // Reset button
        $submitButton.val(originalButtonText);
        $submitButton.prop("disabled", false);

        // Show error message
        $statusContainer.html(
          '<div class="alert alert-danger">Oops! An error occurred while sending your message. Please try again later.</div>'
        );
      },
    });
  });
});
