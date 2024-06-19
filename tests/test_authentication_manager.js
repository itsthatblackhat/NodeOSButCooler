const AuthenticationManager = require('../authentication/authentication_manager');
const authManager = new AuthenticationManager();

function runAuthenticationManagerTests() {
    console.log("Running authentication manager tests...");
    authManager.initialize();

    // Add a new user
    authManager._addUser('testuser', 'testpassword');
    console.log("User 'testuser' added.");

    // Authenticate user
    try {
        authManager.authenticate('testuser', 'testpassword');
        console.log("Authentication successful for 'testuser'.");
    } catch (error) {
        console.error("Authentication failed for 'testuser':", error.message);
    }

    // Login user
    try {
        const sessionId = authManager.login('testuser', 'testpassword');
        console.log(`User 'testuser' logged in with session ID: ${sessionId}`);

        // Check authentication status
        const isAuthenticated = authManager.isAuthenticated(sessionId);
        console.log(`Is user authenticated? ${isAuthenticated}`);

        // Get username from session ID
        const username = authManager.getUsername(sessionId);
        console.log(`Username for session ID ${sessionId}: ${username}`);

        // Logout user
        authManager.logout(sessionId);
        console.log(`User 'testuser' logged out.`);
    } catch (error) {
        console.error("Login failed for 'testuser':", error.message);
    }

    // Change password
    try {
        authManager.changePassword('testuser', 'testpassword', 'newpassword');
        console.log("Password changed for 'testuser'.");

        // Authenticate with new password
        authManager.authenticate('testuser', 'newpassword');
        console.log("Authentication successful for 'testuser' with new password.");
    } catch (error) {
        console.error("Password change failed for 'testuser':", error.message);
    }

    // Delete user
    try {
        authManager.deleteUser('testuser');
        console.log("User 'testuser' deleted.");

        // Attempt to authenticate deleted user
        authManager.authenticate('testuser', 'newpassword');
    } catch (error) {
        console.error("Authentication failed for deleted user 'testuser':", error.message);
    }

    console.log("Authentication manager tests completed.");
}

runAuthenticationManagerTests();
