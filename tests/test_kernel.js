const Kernel = require('../kernel/kernel');
const kernel = new Kernel();

function runKernelTests() {
    console.log("Running kernel tests...");
    kernel.initialize();

    // Run the kernel
    kernel.run();

    // Handle some system calls
    console.log("Handling system calls...");

    // Create a process
    const processId = kernel.handleSystemCall('createProcess', [0, {}, null, false, null, null, null]);

    // Allocate memory for the process
    const memoryAddress = kernel.handleSystemCall('allocateMemory', [processId, null, 0, 1024, 0, 0]);
    console.log(`Memory allocated at address ${memoryAddress} for process ${processId}`);

    // Create a file
    const fileHandle = kernel.handleSystemCall('createFile', ['testfile.txt', 'w']);
    console.log(`File created with handle ${fileHandle}`);

    // Write to the file
    kernel.handleSystemCall('writeFile', [fileHandle, Buffer.from('Hello, world!'), 0, 'Hello, world!'.length, 0]);

    // Read from the file
    const buffer = Buffer.alloc(1024);
    const bytesRead = kernel.handleSystemCall('readFile', [fileHandle, buffer, 0, 12, 0]);
    console.log(`Read ${bytesRead} bytes: ${buffer.toString('utf8', 0, bytesRead)}`);

    // Close the file
    kernel.handleSystemCall('deleteFile', ['testfile.txt']);

    // Terminate the process
    kernel.handleSystemCall('terminateProcess', [processId]);

    console.log("Kernel tests completed.");
}

runKernelTests();
