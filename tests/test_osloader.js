const assert = require('assert');
const osloader = require('../kernel/osloader');

function runTests() {
    console.log("Running OS Loader Tests...");

    try {
        // Test: should load the OS successfully
        const argv = []; // Add necessary arguments
        const result = osloader.loadOS(argv);
        assert.strictEqual(result, true, 'OS should load successfully');
        console.log("Test passed: OS should load successfully");

        // Add more tests as needed
    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

runTests();
