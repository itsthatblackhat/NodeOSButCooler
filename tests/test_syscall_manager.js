const Kernel = require('../kernel/kernel');
const SyscallManager = require('../kernel/syscall_manager');
const kernel = new Kernel();
const syscallManager = new SyscallManager(kernel);

function runSyscallManagerTests() {
    console.log("Running syscall manager tests...");
    kernel.initialize();
    syscallManager.initialize();

    // Test system calls
    try {
        const processId = syscallManager.handleSyscall('createProcess', 0, {}, null, false, null, null, null);
        console.log(`Process created with ID: ${processId}`);

        const memoryAddress = syscallManager.handleSyscall('allocateMemory', processId, null, 0, 1024, 0, 0);
        console.log(`Memory allocated at address: ${memoryAddress}`);

        syscallManager.handleSyscall('terminateProcess', processId);
        console.log(`Process ${processId} terminated`);

    } catch (error) {
        console.error("Syscall test failed:", error.message);
    }

    console.log("Syscall manager tests completed.");
}

runSyscallManagerTests();
