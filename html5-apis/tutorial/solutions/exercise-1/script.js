// Wait for the DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Get references to form elements
    const form = document.getElementById('registrationForm');
    const firstNameInput = document.getElementById('firstName');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const numFamilyMembersInput = document.getElementById('numFamilyMembers');
    const familyMembersContainer = document.getElementById('familyMembers');

    // Retrieve saved values from localStorage
    firstNameInput.value = localStorage.getItem('firstName') || '';
    emailInput.value = localStorage.getItem('email') || '';
    phoneNumberInput.value = localStorage.getItem('phoneNumber') || '';
    numFamilyMembersInput.value = localStorage.getItem('numFamilyMembers') || '0';
    
    // Generate family member fields based on the saved number of members
    generateFamilyMemberFields(Number(numFamilyMembersInput.value));

    // Add an event listener to dynamically generate family member fields
    numFamilyMembersInput.addEventListener('input', () => {
        generateFamilyMemberFields(Number(numFamilyMembersInput.value));
    });

    // Add a submit event listener to the form
    form.addEventListener('submit', (event) => {
        // Prevent the form from submitting normally
        event.preventDefault();
        
        // Validate the form fields
        let isValid = true;
        isValid &= validateField(firstNameInput, 'firstNameError', '*First name is required');
        isValid &= validateField(emailInput, 'emailError', '*Email is required', validateEmail);
        isValid &= validateField(phoneNumberInput, 'phoneNumberError', '*Phone number is required');
        isValid &= validateField(numFamilyMembersInput, 'numFamilyMembersError', '*Number is required and must be a positive number', validatePositiveNumber);

        // If all fields are valid, save form values to localStorage
        if (isValid) {
            localStorage.setItem('firstName', firstNameInput.value);
            localStorage.setItem('email', emailInput.value);
            localStorage.setItem('phoneNumber', phoneNumberInput.value);
            localStorage.setItem('numFamilyMembers', numFamilyMembersInput.value);

            // Save each family member name to localStorage
            for (let i = 1; i <= numFamilyMembersInput.value; i++) {
                const memberInput = document.getElementById(`member${i}`);
                localStorage.setItem(`member${i}`, memberInput.value);
            }

            // Show a success message
            alert('Registration successful!');
        }
    });

    /**
     * Validate a form field.
     */
    function validateField(field, errorId, errorMessage, additionalValidation) {
        const errorElement = document.getElementById(errorId);
        if (!field.value.trim() || (additionalValidation && !additionalValidation(field.value))) {
            errorElement.textContent = errorMessage; // Display error message
            return false;
        } else {
            errorElement.textContent = ''; // Clear error message
            return true;
        }
    }

    /**
     * Check if an email address is valid.
     */
    function validateEmail(email) {
        // Simple email pattern for validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    /**
     * Check if a number is positive.
     */
    function validatePositiveNumber(number) {
        return number >= 0;
    }

    /**
     * Dynamically generate fields for family members.
     */
    function generateFamilyMemberFields(count) {
        // Clear previous family member fields
        familyMembersContainer.innerHTML = '';

        // Create a new field for each family member
        for (let i = 1; i <= count; i++) {
            // Create a new div element for each family member
            const memberDiv = document.createElement('div');
            memberDiv.className = 'family-member';
            memberDiv.innerHTML = `
                <label for="member${i}">*Member #${i} name</label>
                <input type="text" id="member${i}" name="member${i}" required>
            `;
            // Get the input element and set the value from localStorage if available
            const memberInput = memberDiv.querySelector(`input`);
            memberInput.value = localStorage.getItem(`member${i}`) || '';
            // Add the div element to the family members container
            familyMembersContainer.appendChild(memberDiv);
        }
    }
});
