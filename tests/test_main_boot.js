const mainBoot = require('../kernel/main_boot');

function runMainBootTests() {
    console.log("Running main boot tests...");

    try {
        mainBoot.mainBootProcess();
        console.log("Main boot process completed successfully.");
    } catch (error) {
        console.error("Main boot process failed:", error.message);
    }

    console.log("Main boot tests completed.");
}

runMainBootTests();
