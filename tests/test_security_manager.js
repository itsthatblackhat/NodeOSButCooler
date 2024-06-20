const SecurityManager = require('../security/security_manager.js');
const securityManager = new SecurityManager();

function runSecurityManagerTests() {
    console.log("Running Security Manager tests...");
    securityManager.initialize();

    // Add users
    securityManager.addUser('adminUser', 'adminPass', 'admin');
    securityManager.addUser('normalUser', 'userPass', 'user');

    // Authenticate users
    try {
        securityManager.authenticate('adminUser', 'adminPass');
        console.log("Admin user authenticated successfully.");
    } catch (error) {
        console.error(`Error authenticating admin user: ${error.message}`);
    }

    try {
        securityManager.authenticate('normalUser', 'userPass');
        console.log("Normal user authenticated successfully.");
    } catch (error) {
        console.error(`Error authenticating normal user: ${error.message}`);
    }

    // Check permissions
    try {
        securityManager.checkPermission('adminUser', 'resource1', 'delete');
        console.log("Admin user has delete permission for resource1.");
    } catch (error) {
        console.error(`Error checking permission for admin user: ${error.message}`);
    }

    try {
        securityManager.checkPermission('normalUser', 'resource1', 'write');
        console.log("Normal user has write permission for resource1.");
    } catch (error) {
        console.error(`Error checking permission for normal user: ${error.message}`);
    }

    // Secure IPC
    securityManager.secureIPC('adminUser', 'normalUser', 'Hello, secure world!');

    console.log("Security Manager tests completed.");
}

runSecurityManagerTests();
