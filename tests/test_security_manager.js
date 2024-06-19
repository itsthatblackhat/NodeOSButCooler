// test_security_manager.js

const SecurityManager = require('../security/security_manager.js');

// Initialize Security Manager
const securityManager = new SecurityManager();
securityManager.initialize();

// Test User Authentication
const username = 'admin';
const password = 'admin123';
const isAuthenticated = securityManager.authenticate(username, password);
console.log(`Authentication for user ${username}: ${isAuthenticated}`);

// Test Adding and Removing Users
securityManager.addUser('newUser', 'newPassword', 'user');
securityManager.removeUser('newUser');

// Test Permissions
securityManager.addPermission('admin', 'resource1', 'read');
const hasPermission = securityManager.checkPermission('admin', 'resource1', 'read');
console.log(`Permission check for user admin: ${hasPermission}`);

// Test Secure IPC
securityManager.secureIPC('admin', 'user', 'Hello, this is a secure message!');
