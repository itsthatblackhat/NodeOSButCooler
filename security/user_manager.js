const crypto = require('crypto');

class UserManager {
    constructor() {
        this.users = new Map(); // Maps username to user information (password hash, roles, etc.)
        this.groups = new Map(); // Maps group name to list of usernames
    }

    initialize() {
        console.log("Initializing User Manager...");
        this._setupDefaultUsersAndGroups();
        console.log("User Manager initialized.");
    }

    _setupDefaultUsersAndGroups() {
        console.log("Setting up default users and groups...");
        // Add a default admin user and group
        this.addUser('admin', 'adminpassword', ['admin']);
        this.addGroup('admins', ['admin']);
    }

    _hashPassword(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    }

    addUser(username, password, roles = []) {
        if (this.users.has(username)) {
            throw new Error('User already exists');
        }
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = this._hashPassword(password, salt);
        this.users.set(username, { hash, salt, roles });
        console.log(`User ${username} added.`);
    }

    removeUser(username) {
        if (!this.users.has(username)) {
            throw new Error('User not found');
        }
        this.users.delete(username);
        console.log(`User ${username} removed.`);
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

    changePassword(username, oldPassword, newPassword) {
        if (this.authenticate(username, oldPassword)) {
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = this._hashPassword(newPassword, salt);
            this.users.set(username, { ...this.users.get(username), hash, salt });
            console.log(`Password changed for user ${username}`);
        }
    }

    addGroup(groupName, members = []) {
        if (this.groups.has(groupName)) {
            throw new Error('Group already exists');
        }
        this.groups.set(groupName, new Set(members));
        console.log(`Group ${groupName} added with members: ${members.join(', ')}`);
    }

    removeGroup(groupName) {
        if (!this.groups.has(groupName)) {
            throw new Error('Group not found');
        }
        this.groups.delete(groupName);
        console.log(`Group ${groupName} removed.`);
    }

    addUserToGroup(username, groupName) {
        if (!this.groups.has(groupName)) {
            throw new Error('Group not found');
        }
        const group = this.groups.get(groupName);
        group.add(username);
        console.log(`User ${username} added to group ${groupName}`);
    }

    removeUserFromGroup(username, groupName) {
        if (!this.groups.has(groupName)) {
            throw new Error('Group not found');
        }
        const group = this.groups.get(groupName);
        group.delete(username);
        console.log(`User ${username} removed from group ${groupName}`);
    }

    listUsers() {
        return Array.from(this.users.keys());
    }

    listGroups() {
        return Array.from(this.groups.keys());
    }

    getUserInfo(username) {
        const user = this.users.get(username);
        if (!user) {
            throw new Error('User not found');
        }
        return { username, roles: user.roles };
    }

    getGroupInfo(groupName) {
        const group = this.groups.get(groupName);
        if (!group) {
            throw new Error('Group not found');
        }
        return { groupName, members: Array.from(group) };
    }
}

module.exports = UserManager;
