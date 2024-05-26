// Import the crypto module
const crypto = require('crypto');

// Define the secret key
const secret = 'rmit2024';

// Create a HMAC object using the SHA-256 algorithm and the secret key
const hash = crypto.createHmac('sha256', secret)
                   // Update the HMAC object with the message
                   .update('Welcome to Web Security')
                   // Get the resulting hash as a hexadecimal string
                   .digest('hex');

// Output the hash to the console
console.log(hash);
