const ProcessManager = require('../process/process_manager');
const processManager = new ProcessManager();

function runProcessManagerTests() {
    console.log("Running process manager tests...");
    processManager.initialize();

    // Create a parent process
    const parentProcessId = processManager.createProcess(0, {}, null, false, null, null, null);

    // Create a child process
    const childProcessId = processManager.createProcess(0, {}, parentProcessId, true, null, null, null);

    // Create threads in the parent process
    processManager.createThread(parentProcessId, 'startAddress1', 1024, 10);
    processManager.createThread(parentProcessId, 'startAddress2', 1024, 10);

    // Create a thread in the child process
    processManager.createThread(childProcessId, 'startAddress3', 1024, 10);

    // Simulate IPC
    processManager.handleIPC('Hello from parent', parentProcessId, childProcessId);

    // Terminate the child process
    processManager.terminateProcess(childProcessId);

    // Terminate the parent process
    processManager.terminateProcess(parentProcessId);

    console.log("Process manager tests completed.");
}

runProcessManagerTests();
