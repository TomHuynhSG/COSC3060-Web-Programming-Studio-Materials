document.addEventListener("DOMContentLoaded", function() {
    var submitBtn = document.querySelector('.submitButton');
    submitBtn.addEventListener('click', function() {
        alert("Form Submitted!");
        // Here you can add more functionality like validating the form
        // and sending data to a server.
    });
});
