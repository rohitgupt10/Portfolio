document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.querySelector('form[action^="https://formspree.io"]');

  if (form) {
    // Create a status element to show submission results
    const statusElement = document.createElement("div");
    statusElement.className = "form-status mt-4";
    form.appendChild(statusElement);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Show sending status
      statusElement.innerHTML =
        '<div class="alert alert-info">Sending message...</div>';

      // Prepare form data
      const formData = new FormData(form);

      // Send form data to Formspree
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(
            `Server responded with ${response.status}: ${response.statusText}`
          );
        })
        .then((data) => {
          // Success
          statusElement.innerHTML =
            '<div class="alert alert-success">Message sent successfully!</div>';
          form.reset();

          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = "thanks.html";
          }, 2000);
        })
        .catch((error) => {
          // Error
          console.error("Form submission error:", error);
          statusElement.innerHTML = `<div class="alert alert-danger">
                    <p>Error sending message: ${error.message}</p>
                    <p>Please try again or contact directly at: binaygupta191@gmail.com</p>
                </div>`;
        });
    });
  }
});
