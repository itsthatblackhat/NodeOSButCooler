const UserManager = require('../security/user_manager');
const userManager = new UserManager();

function runUserManagerTests() {
    console.log("Running user manager tests...");
    userManager.initialize();

    // Add a new user
    userManager.addUser('testuser', 'testpassword', ['user']);
    console.log("User 'testuser' added.");

    // Authenticate user
    try {
        userManager.authenticate('testuser', 'testpassword');
        console.log("Authentication successful for 'testuser'.");
    } catch (error) {
        console.error("Authentication failed for 'testuser':", error.message);
    }

    // Change user password
    try {
        userManager.changePassword('testuser', 'testpassword', 'newpassword');
        console.log("Password changed for 'testuser'.");
        userManager.authenticate('testuser', 'newpassword');
        console.log("Authentication successful for 'testuser' with new password.");
    } catch (error) {
        console.error("Password change failed for 'testuser':", error.message);
    }

    // Add a new group
    userManager.addGroup('testgroup', ['testuser']);
    console.log("Group 'testgroup' added with member 'testuser'.");

    // Add user to group
    userManager.addUserToGroup('testuser2', 'testgroup');
    console.log("User 'testuser2' added to group 'testgroup'.");

    // List all users
    const users = userManager.listUsers();
    console.log("Users:", users);

    // List all groups
    const groups = userManager.listGroups();
    console.log("Groups:", groups);

    // Get user info
    const userInfo = userManager.getUserInfo('testuser');
    console.log("User Info:", userInfo);

    // Get group info
    const groupInfo = userManager.getGroupInfo('testgroup');
    console.log("Group Info:", groupInfo);

    // Remove user from group
    userManager.removeUserFromGroup('testuser2', 'testgroup');
    console.log("User 'testuser2' removed from group 'testgroup'.");

    // Remove user
    userManager.removeUser('testuser');
    console.log("User 'testuser' removed.");

    // Remove group
    userManager.removeGroup('testgroup');
    console.log("Group 'testgroup' removed.");

    console.log("User manager tests completed.");
}

runUserManagerTests();
