const Kernel = require('../kernel/kernel');

function runSyscallManagerTests() {
    console.log("Running syscall manager tests...");
    const kernel = new Kernel();
    kernel.initialize();

    try {
        // Example syscall tests
        kernel.handleSystemCall('createDirectory', ['test_dir']);
        console.log('createDirectory syscall passed.');

        kernel.handleSystemCall('deleteDirectory', ['test_dir']);
        console.log('deleteDirectory syscall passed.');

        kernel.handleSystemCall('allocateMemory', [1, null, 0, 1024, 0, 0]);
        console.log('allocateMemory syscall passed.');

        // Add more syscall tests as needed
    } catch (error) {
        console.error(`Syscall test failed: ${error.message}`);
    }

    console.log("Syscall manager tests completed.");
}

runSyscallManagerTests();
