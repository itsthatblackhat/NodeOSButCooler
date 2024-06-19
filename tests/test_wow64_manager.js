const Wow64Manager = require('../wow64/wow64_manager');
const wow64Manager = new Wow64Manager();

function runWow64ManagerTests() {
    console.log("Running Wow64 manager tests...");
    wow64Manager.initialize();

    // Create a 32-bit process
    const processId = wow64Manager.create32BitProcess('C:\\Program Files (x86)\\TestApp\\testapp.exe', ['--arg1', '--arg2']);
    console.log(`32-bit process created with ID ${processId}`);

    // Allocate memory for the 32-bit process
    const memoryAddress = wow64Manager.handle32BitSystemCall(processId, 'allocateMemory', [1024]);
    console.log(`Memory allocated at address ${memoryAddress} for process ${processId}`);

    // Read from a file
    const readResult = wow64Manager.handle32BitSystemCall(processId, 'readFile', [1, Buffer.alloc(1024), 0, 100]);
    console.log(`Read result: ${readResult}`);

    // Write to a file
    const writeResult = wow64Manager.handle32BitSystemCall(processId, 'writeFile', [1, Buffer.from('Hello, world!'), 0, 13]);
    console.log(`Write result: ${writeResult}`);

    // Free memory
    wow64Manager.handle32BitSystemCall(processId, 'freeMemory', [memoryAddress, 1024]);
    console.log(`Memory at address ${memoryAddress} for process ${processId} freed`);

    // List all 32-bit processes
    const processes = wow64Manager.list32BitProcesses();
    console.log("32-bit processes:", processes);

    // Terminate the 32-bit process
    wow64Manager.terminate32BitProcess(processId);
    console.log(`32-bit process ${processId} terminated`);

    console.log("Wow64 manager tests completed.");
}

runWow64ManagerTests();
