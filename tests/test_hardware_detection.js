const hardwareDetection = require('../kernel/hardware_detection');

function runHardwareDetectionTests() {
    console.log("Running hardware detection tests...");

    try {
        hardwareDetection.hardwareDetectionProcess();
        console.log("Hardware detection and initialization completed successfully.");
    } catch (error) {
        console.error("Hardware detection process failed:", error.message);
    }

    console.log("Hardware detection tests completed.");
}

runHardwareDetectionTests();
