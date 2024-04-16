document.querySelector('#submitBtn').addEventListener('click', myValidate); // For clicking on the submit button
document.querySelector('#myForm').addEventListener('submit', myValidate); // For handling the form submission with 'enter'

function myValidate(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var nameInput = document.querySelector('#nameInput').value; // Get the value from the name input field
    console.log(nameInput);
    var errorMessageDiv = document.querySelector('#errorMessage'); // Get the error message div

    if (nameInput == '') {
        errorMessageDiv.textContent = 'Error: The name field is required. Please enter your name to proceed.'; // Set the text of the error message
        errorMessageDiv.style.display = 'block'; // Show the error message div

        // Focus the error message div so that screen readers will read it out.
        errorMessageDiv.tabIndex = -1;
        errorMessageDiv.focus();

    } else {
        errorMessageDiv.textContent = '';
        errorMessageDiv.style.display = 'none';
        // Proceed with form submission or further actions
        alert('Submitted name: ' + nameInput);
        
        // Add your code here to submit the form or perform additional actions
    }
}
