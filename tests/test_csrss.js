const CSRSS = require('../subsys/csrss');
const csrss = new CSRSS();

function runCsrssTests() {
    console.log("Running CSRSS tests...");
    csrss.initialize();

    // Create a process
    const processId = 1;
    const processInfo = { name: 'Test Process', priority: 'normal' };
    csrss.createProcess(processId, processInfo);

    // Get process info
    const info = csrss.getProcessInfo(processId);
    console.log(`Process Info:`, info);

    // Send a message to the process
    csrss.sendMessage(processId, 'Hello, Process!');

    // List all processes
    const processes = csrss.listProcesses();
    console.log("Processes:", processes);

    // Terminate the process
    csrss.terminateProcess(processId);

    // Handle client requests
    const newProcessId = csrss.handleClientRequest('createProcess', { processId: 2, processInfo: { name: 'Another Process', priority: 'high' } });
    const processMessage = csrss.handleClientRequest('sendMessage', { processId: newProcessId, message: 'Hello, Another Process!' });
    const processDetails = csrss.handleClientRequest('getProcessInfo', { processId: newProcessId });
    console.log(`Process Details:`, processDetails);
    csrss.handleClientRequest('terminateProcess', { processId: newProcessId });

    console.log("CSRSS tests completed.");
}

runCsrssTests();
