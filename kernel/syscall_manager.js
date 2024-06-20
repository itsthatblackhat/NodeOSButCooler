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
            'createFile': this.kernel.fileSystemManager.createFile.bind(this.kernel.fileSystemManager),
            'readFile': this.kernel.fileSystemManager.readFile.bind(this.kernel.fileSystemManager),
            'writeFile': this.kernel.fileSystemManager.writeFile.bind(this.kernel.fileSystemManager),
            'deleteFile': this.kernel.fileSystemManager.deleteFile.bind(this.kernel.fileSystemManager),
            'listFiles': this.kernel.fileSystemManager.listFiles.bind(this.kernel.fileSystemManager),
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
