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
        console.log("Setting up system calls...");
        // Define the system call handlers here
        this.syscalls = {
            'createProcess': this.kernel.processManager.createProcess.bind(this.kernel.processManager),
            'terminateProcess': this.kernel.processManager.terminateProcess.bind(this.kernel.processManager),
            'allocateMemory': this.kernel.memoryManager.allocateMemory.bind(this.kernel.memoryManager),
            'freeMemory': this.kernel.memoryManager.freeMemory.bind(this.kernel.memoryManager),
            'createFile': this.kernel.ioManager.createFile.bind(this.kernel.ioManager),
            'readFile': this.kernel.ioManager.readFile.bind(this.kernel.ioManager),
            'writeFile': this.kernel.ioManager.writeFile.bind(this.kernel.ioManager),
            'deleteFile': this.kernel.ioManager.deleteFile.bind(this.kernel.ioManager),
            'addDevice': this.kernel.deviceManager.addDevice.bind(this.kernel.deviceManager),
            'removeDevice': this.kernel.deviceManager.removeDevice.bind(this.kernel.deviceManager),
            'authenticateUser': this.kernel.securityManager.authenticate.bind(this.kernel.securityManager),
            'checkPermissions': this.kernel.securityManager.authorize.bind(this.kernel.securityManager),
            'sendNetworkRequest': this.kernel.networkManager.handleNetworkRequests.bind(this.kernel.networkManager),
            'sendSubsystemRequest': this.kernel.subsystemManager.sendSubsystemRequest.bind(this.kernel.subsystemManager)
        };
    }

    handleSyscall(sysCallId, ...args) {
        console.log(`Handling system call ${sysCallId} with args:`, args);
        const syscallHandler = this.syscalls[sysCallId];
        if (!syscallHandler) {
            throw new Error(`Unknown system call ID: ${sysCallId}`);
        }
        return syscallHandler(...args);
    }
}

module.exports = SyscallManager;
