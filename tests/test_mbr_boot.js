const assert = require('assert');
const mbrBoot = require('../kernel/mbr_boot');

function runTests() {
    console.log("Running MBR Boot Tests...");

    try {
        // Test: should initialize MBR successfully
        const result = mbrBoot.initializeMBR();
        assert.strictEqual(result, true, 'MBR should initialize successfully');
        console.log("Test passed: MBR should initialize successfully");

        // Add more tests as needed
    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

runTests();
