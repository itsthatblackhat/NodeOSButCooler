const MemoryManager = require('../memory/memory_manager');
const ProcessManager = require('../process/process_manager');
const IOManager = require('../io/io_manager');
const DeviceManager = require('../device/device_manager');
const NetworkManager = require('../network/network_manager');
const SecurityManager = require('../security/security_manager');
const SubsystemManager = require('../subsys/subsys_manager');

class Kernel {
    constructor() {
        this.memoryManager = new MemoryManager();
        this.processManager = new ProcessManager();
        this.ioManager = new IOManager();
        this.deviceManager = new DeviceManager();
        this.networkManager = new NetworkManager();
        this.securityManager = new SecurityManager();
        this.subsystemManager = new SubsystemManager();
    }

    initialize() {
        console.log("Initializing Kernel...");

        try {
            this.memoryManager.initialize();
            this.processManager.initialize();
            this.ioManager.initialize();
            this.deviceManager.initialize();
            this.networkManager.initialize();
            this.securityManager.initialize();
            this.subsystemManager.initialize();
            console.log("Kernel initialized successfully.");
        } catch (error) {
            console.error("Kernel initialization failed:", error);
            throw error;
        }
    }

    run() {
        console.log("Kernel is running...");
        // Simulate the main loop of the kernel
        setInterval(() => {
            this.processManager.schedule();
        }, 1000); // Simulate a scheduler tick every second
    }

    handleSystemCall(sysCallId, args) {
        console.log(`Handling system call ${sysCallId} with args:`, args);
        // Implement system call handling logic
        // For example, sysCallId could be 'createProcess', 'allocateMemory', etc.
        switch (sysCallId) {
            case 'createProcess':
                return this.processManager.createProcess(...args);
            case 'terminateProcess':
                return this.processManager.terminateProcess(...args);
            case 'allocateMemory':
                return this.memoryManager.allocateVirtualMemory(...args);
            case 'freeMemory':
                return this.memoryManager.freeVirtualMemory(...args);
            case 'createFile':
                return this.ioManager.createFile(...args);
            case 'readFile':
                return this.ioManager.readFile(...args);
            case 'writeFile':
                return this.ioManager.writeFile(...args);
            case 'deleteFile':
                return this.ioManager.deleteFile(...args);
            case 'addDevice':
                return this.deviceManager.addDevice(...args);
            case 'removeDevice':
                return this.deviceManager.removeDevice(...args);
            case 'authenticateUser':
                return this.securityManager.authenticateUser(...args);
            case 'checkPermissions':
                return this.securityManager.checkPermissions(...args);
            case 'sendNetworkRequest':
                return this.networkManager.handleNetworkRequests(...args);
            case 'sendSubsystemRequest':
                return this.subsystemManager.sendSubsystemRequest(...args);
            default:
                throw new Error(`Unknown system call ID: ${sysCallId}`);
        }
    }
}

module.exports = Kernel;
