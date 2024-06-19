const Kernel = require('../kernel/kernel.js');
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
    console.log(`Process created with ID ${processId}`);

    // Allocate memory for the process
    const memoryAddress = kernel.handleSystemCall('allocateVirtualMemory', [processId, null, 0, 1024, 0, 0]);
    console.log(`Memory allocated at address ${memoryAddress} for process ${processId}`);

    // Create a file
    const fileHandle = kernel.handleSystemCall('createFile', ['testfile.txt', 'w']);
    console.log(`File created with handle ${fileHandle}`);

    // Write to the file
    kernel.handleSystemCall('writeFile', [fileHandle, Buffer.from('Hello, world!'), 0, 'Hello, world!'.length, 0]);

    // Close the file after writing
    kernel.handleSystemCall('closeFile', [fileHandle]);

    // Reopen the file for reading
    const readFileHandle = kernel.handleSystemCall('createFile', ['testfile.txt', 'r']);
    console.log(`File opened for reading with handle ${readFileHandle}`);

    // Read from the file
    const buffer = Buffer.alloc(1024);
    const bytesRead = kernel.handleSystemCall('readFile', [readFileHandle, buffer, 0, 'Hello, world!'.length, 0]);
    console.log(`Read ${bytesRead} bytes: ${buffer.toString('utf8', 0, bytesRead)}`);

    // Close the file after reading
    kernel.handleSystemCall('closeFile', [readFileHandle]);

    // Terminate the process
    kernel.handleSystemCall('terminateProcess', [processId]);

    console.log("Kernel tests completed.");
}

runKernelTests();
