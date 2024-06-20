const ntfsBoot = require('../kernel/ntfs_boot');

function runNtfsBootTests() {
    console.log("Running NTFS boot tests...");

    // Set environment variable to use mock
    process.env.USE_MOCK = 'true';

    try {
        ntfsBoot.ntfsBoot('/dev/sda');
        console.log("NTFS boot process completed successfully.");
    } catch (error) {
        console.error("NTFS boot process failed:", error.message);
    }

    console.log("NTFS boot tests completed.");
}

runNtfsBootTests();
