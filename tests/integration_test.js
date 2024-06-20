// integration_test.js
const Kernel = require('../kernel/kernel');
const shell = require('../shell/shell');

(async () => {
    console.log("Starting integration test...");

    // Initialize the kernel
    const kernel = new Kernel();
    kernel.initialize();

    // Initialize the shell
    const jsShell = new shell();
    jsShell.initialize();

    // Basic operations test
    try {
        // Create a process
        const processId = kernel.processManager.createProcess(1, 'normal');
        console.log(`Process created with ID: ${processId}`);

        // Allocate memory
        const memoryAddress = kernel.memoryManager.allocate(1024);
        console.log(`Memory allocated at address: ${memoryAddress}`);

        // Create a file
        const filePath = './test_file.txt';
        kernel.fileSystemManager.createFile(filePath, 'Hello, JSOS!');
        console.log(`File created at path: ${filePath}`);

        // Read the file
        const fileContent = kernel.fileSystemManager.readFile(filePath);
        console.log(`File content: ${fileContent}`);

        // Delete the file
        kernel.fileSystemManager.deleteFile(filePath);
        console.log(`File deleted at path: ${filePath}`);

        // Terminate the process
        kernel.processManager.terminateProcess(processId);
        console.log(`Process terminated with ID: ${processId}`);

        console.log("Integration test completed successfully.");
    } catch (error) {
        console.error("Integration test failed:", error);
    }
})();
