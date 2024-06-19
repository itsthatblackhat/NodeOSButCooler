const Kernel = require('../kernel/kernel.js');
const kernel = new Kernel();

function runShellTests() {
    console.log("Running shell tests...");
    kernel.initialize();

    // Simulate shell operations
    console.log("JSOS> Shell initialized.");

    // Create a process
    const processId = kernel.handleSystemCall('createProcess', [0, {}, null, false, null, null, null]);
    console.log(`Process created with ID ${processId}`);

    // Allocate memory for the process
    try {
        const memoryAddress = kernel.handleSystemCall('allocateMemory', [processId, null, 0, 1024, 0, 0]);
        console.log(`Memory allocated at address ${memoryAddress} for process ${processId}`);
    } catch (error) {
        console.error(`Memory allocation failed: ${error.message}`);
    }

    // List processes
    const processes = kernel.processManager.listProcesses();
    console.log(`List of processes:`);
    processes.forEach(p => console.log(`Process ID: ${p.pid}, Info: ${JSON.stringify(p)}`));

    console.log("Shell tests completed.");
}

runShellTests();
