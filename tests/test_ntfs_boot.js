const assert = require('assert');
const ntfsBoot = require('../kernel/ntfs_boot');

function runTests() {
    console.log("Running NTFS Boot Tests...");

    try {
        // Test: should load NTLDR successfully
        const result = ntfsBoot.loadNTLDR();
        assert.strictEqual(result, true, 'NTLDR should load successfully');
        console.log("Test passed: NTLDR should load successfully");

        // Add more tests as needed
    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

runTests();
