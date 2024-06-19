const crypto = require('crypto');

class AuthenticationManager {
    constructor() {
        this.users = new Map(); // Maps username to user information (password hash, salt, session info)
        this.sessions = new Map(); // Maps sessionId to username
        this.nextSessionId = 1;
    }

    initialize() {
        console.log("Initializing Authentication Manager...");
        this._setupUsers();
        console.log("Authentication Manager initialized.");
    }

    _setupUsers() {
        console.log("Setting up user database...");
        // Simulate setting up initial users
        this._addUser('admin', 'password');
    }

    _addUser(username, password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = this._hashPassword(password, salt);
        this.users.set(username, { hash, salt });
    }

    _hashPassword(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    }

    authenticate(username, password) {
        const user = this.users.get(username);
        if (!user) {
            throw new Error('User not found');
        }
        const hash = this._hashPassword(password, user.salt);
        if (hash !== user.hash) {
            throw new Error('Invalid password');
        }
        return true;
    }

    login(username, password) {
        if (this.authenticate(username, password)) {
            const sessionId = this.nextSessionId++;
            this.sessions.set(sessionId, username);
            return sessionId;
        }
    }

    logout(sessionId) {
        if (!this.sessions.has(sessionId)) {
            throw new Error('Invalid session');
        }
        this.sessions.delete(sessionId);
    }

    isAuthenticated(sessionId) {
        return this.sessions.has(sessionId);
    }

    getUsername(sessionId) {
        return this.sessions.get(sessionId);
    }

    changePassword(username, oldPassword, newPassword) {
        if (this.authenticate(username, oldPassword)) {
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = this._hashPassword(newPassword, salt);
            this.users.set(username, { hash, salt });
        }
    }

    deleteUser(username) {
        if (!this.users.has(username)) {
            throw new Error('User not found');
        }
        this.users.delete(username);
    }
}

module.exports = AuthenticationManager;
