const ProcessManager = require('../kernel/process_manager');

const processManager = new ProcessManager();

function runProcessManagerTests() {
    console.log("Running process manager tests...");
    processManager.initialize();

    // Create a parent process
    const parentProcessId = processManager.createProcess(1, 5);

    // Create a child process
    const childProcessId = processManager.createProcess(2, 3);

    // Simulate IPC
    processManager.sendMessage(parentProcessId, 'Hello from parent');
    processManager.sendMessage(childProcessId, 'Hello from child');

    // Terminate the child process
    processManager.terminateProcess(childProcessId);

    // Terminate the parent process
    processManager.terminateProcess(parentProcessId);

    console.log("Process manager tests completed.");
}

runProcessManagerTests();
