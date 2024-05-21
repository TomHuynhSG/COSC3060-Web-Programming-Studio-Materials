// Import the 'passport' library, which is used for user authentication
const passport = require('passport');

// Import the Google OAuth 2.0 strategy from the 'passport-google-oauth20' package
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Serialize the user object into a format that can be stored in the session
passport.serializeUser((user, done) => {
  done(null, user); // Store the entire user object in the session
});

// Deserialize the user object from the session
passport.deserializeUser((obj, done) => {
  done(null, obj); // Retrieve the user object from the session
});

// Configure the Google strategy for Passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID from environment variables
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google client secret from environment variables
  callbackURL: '/auth/google/callback' // URL to which Google will redirect after authentication
},
(accessToken, refreshToken, profile, done) => {
  // This function is called after Google has authenticated the user

  // Extract relevant user data from the profile object provided by Google
  const user = {
    id: profile.id, // Google user ID
    displayName: profile.displayName, // User's display name
    emails: profile.emails, // Array of user's email addresses
    photos: profile.photos // Array of user's profile photos
  };

  // Call the done function to pass the user object to the next stage of authentication
  done(null, user);
}
));
