document.querySelector('#submitBtn').addEventListener('click', myValidate); // For clicking on the submit button
document.querySelector('#myForm').addEventListener('submit', myValidate); // For handling the form submission with 'enter'

function myValidate(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var nameInput = document.querySelector('#nameInput').value; // Get the value from the name input field
    var errorMessageDiv = document.querySelector('#errorMessage'); // Get the error message div

    if (nameInput === '') {
        errorMessageDiv.textContent = 'Please enter your name.'; // Set the text of the error message
        errorMessageDiv.style.display = 'block'; // Show the error message div
        setTimeout(function() {
            errorMessageDiv.style.display = 'none'; // Hide the error message div after 2 seconds
            errorMessageDiv.textContent = ''; // Clear the error message
        }, 2000);
    } else {
        console.log('Submitted name:', nameInput); // Log the submitted name if the input is not empty
        // Add your code here to submit the form or perform additional actions
    }
}
