const crypto = require('crypto');

class SecurityManager {
    constructor() {
        this.users = new Map();
        this.permissions = new Map();
    }

    initialize() {
        console.log("Initializing Security Manager...");
        this._setupDefaultUsers();
        this._setupDefaultPermissions();
        console.log("Security Manager initialized.");
    }

    _setupDefaultUsers() {
        console.log("Setting up default users...");
        // Default users with hashed passwords
        this.users.set('admin', { password: this._hashPassword('admin123'), role: 'admin' });
        this.users.set('user', { password: this._hashPassword('user123'), role: 'user' });
    }

    _setupDefaultPermissions() {
        console.log("Setting up default permissions...");
        // Default permissions
        this.permissions.set('admin', ['read', 'write', 'delete']);
        this.permissions.set('user', ['read']);
    }

    _hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    authenticate(username, password) {
        const user = this.users.get(username);
        const hashedPassword = this._hashPassword(password);
        if (user && user.password === hashedPassword) {
            console.log(`User ${username} authenticated successfully.`);
            return true;
        } else {
            console.error(`Authentication failed for user ${username}.`);
            return false;
        }
    }

    addUser(username, password, role = 'user') {
        if (this.users.has(username)) {
            throw new Error(`User ${username} already exists.`);
        }
        const hashedPassword = this._hashPassword(password);
        this.users.set(username, { password: hashedPassword, role });
        console.log(`User ${username} added successfully.`);
    }

    removeUser(username) {
        if (this.users.has(username)) {
            this.users.delete(username);
            console.log(`User ${username} removed successfully.`);
        } else {
            console.error(`User ${username} not found.`);
        }
    }

    addPermission(username, resource, permission) {
        if (!this.permissions.has(resource)) {
            this.permissions.set(resource, new Map());
        }
        this.permissions.get(resource).set(username, permission);
        console.log(`Permission ${permission} for resource ${resource} added to user ${username}.`);
    }

    checkPermission(username, resource, permission) {
        if (this.permissions.has(resource) && this.permissions.get(resource).get(username) === permission) {
            console.log(`User ${username} has ${permission} permission for resource ${resource}.`);
            return true;
        } else {
            console.error(`User ${username} does not have ${permission} permission for resource ${resource}.`);
            return false;
        }
    }

    secureIPC(sender, receiver, message) {
        console.log(`Securing IPC from ${sender} to ${receiver}`);
        const encryptedMessage = `encrypted(${message})`;
        console.log(`Encrypted message: ${encryptedMessage}`);
        this.sendMessage(receiver, encryptedMessage);
    }

    sendMessage(receiver, message) {
        console.log(`Sending message to ${receiver}: ${message}`);
    }
}

module.exports = SecurityManager;
