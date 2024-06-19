const SecurityManager = require('../security/security_manager');
const securityManager = new SecurityManager();

function runSecurityManagerTests() {
    console.log("Running security manager tests...");
    securityManager.initialize();

    // Add users
    securityManager.addUser('alice', 'password123', ['read', 'write']);
    securityManager.addUser('bob', 'securepassword', ['read']);

    // Authenticate users
    console.log(securityManager.authenticateUser('alice', 'password123')); // Should be true
    console.log(securityManager.authenticateUser('bob', 'wrongpassword')); // Should be false

    // Check permissions
    console.log(securityManager.checkPermissions('alice', '/file.txt', 'read')); // Should be true
    console.log(securityManager.checkPermissions('bob', '/file.txt', 'write')); // Should be false

    // Change password
    console.log(securityManager.changePassword('alice', 'password123', 'newpassword')); // Should be true
    console.log(securityManager.authenticateUser('alice', 'newpassword')); // Should be true

    // Update permissions
    console.log(securityManager.updatePermissions('bob', ['read', 'write'])); // Should be true
    console.log(securityManager.checkPermissions('bob', '/file.txt', 'write')); // Should be true

    // List users
    const users = securityManager.listUsers();
    console.log("Users:", users);

    // Get user info
    const userInfo = securityManager.getUserInfo('alice');
    console.log("User Info for alice:", userInfo);

    // Remove user
    securityManager.removeUser('alice');
    console.log(securityManager.authenticateUser('alice', 'newpassword')); // Should be false

    console.log("Security manager tests completed.");
}

runSecurityManagerTests();
