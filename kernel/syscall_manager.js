class SyscallManager {
    constructor(kernel) {
        this.kernel = kernel;
    }

    initialize() {
        console.log("Initializing Syscall Manager...");
        this._setupSyscalls();
        console.log("Syscall Manager initialized.");
    }

    _setupSyscalls() {
        this.syscalls = {
            'createDirectory': this.kernel.fileSystemManager.createDirectory.bind(this.kernel.fileSystemManager),
            'deleteDirectory': this.kernel.fileSystemManager.deleteDirectory.bind(this.kernel.fileSystemManager),
            'allocateMemory': this.kernel.memoryManager.allocateVirtualMemory.bind(this.kernel.memoryManager),
            'freeMemory': this.kernel.memoryManager.freeVirtualMemory.bind(this.kernel.memoryManager),
            'createProcess': this.kernel.processManager.createProcess.bind(this.kernel.processManager),
            'terminateProcess': this.kernel.processManager.terminateProcess.bind(this.kernel.processManager),
            'createFile': this.kernel.ioManager.createFile.bind(this.kernel.ioManager),
            'readFile': this.kernel.ioManager.readFile.bind(this.kernel.ioManager),
            'writeFile': this.kernel.ioManager.writeFile.bind(this.kernel.ioManager),
            'deleteFile': this.kernel.ioManager.deleteFile.bind(this.kernel.ioManager)
            // Add other syscalls as needed
        };
    }

    handleSystemCall(syscall, args) {
        const syscallHandler = this.syscalls[syscall];
        if (syscallHandler) {
            return syscallHandler(...args);
        } else {
            throw new Error(`Unknown syscall: ${syscall}`);
        }
    }
}

module.exports = SyscallManager;
