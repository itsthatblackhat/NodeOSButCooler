const MemoryManager = require('../memory/memory_manager');
const ProcessManager = require('./process_manager');
const IOManager = require('../io/io_manager');
const DeviceManager = require('../device/device_manager');
const NetworkManager = require('../network/network_manager');
const SecurityManager = require('../security/security_manager');
const SubsystemManager = require('../subsys/subsys_manager');
const SyscallManager = require('./syscall_manager');
const FileSystemManager = require('../filesys/filesystem_manager');
const EventManager = require('../events/event_manager');

class Kernel {
    constructor() {
        this.memoryManager = new MemoryManager();
        this.processManager = new ProcessManager();
        this.ioManager = new IOManager();
        this.deviceManager = new DeviceManager();
        this.networkManager = new NetworkManager();
        this.securityManager = new SecurityManager();
        this.subsystemManager = new SubsystemManager();
        this.eventManager = new EventManager();
        this.fileSystemManager = new FileSystemManager(this.eventManager);
        this.syscallManager = new SyscallManager(this);
    }

    initialize() {
        console.log("Initializing Kernel...");
        this.memoryManager.initialize();
        this.processManager.initialize();
        this.ioManager.initialize();
        this.deviceManager.initialize();
        this.networkManager.initialize();
        this.securityManager.initialize();
        this.subsystemManager.initialize();
        this.eventManager.initialize();
        this.fileSystemManager.initialize();
        this.syscallManager.initialize();
        this.eventManager.emitEvent('kernelInitialized', {});
        console.log("Kernel initialized successfully.");
    }

    run() {
        console.log("Kernel is running...");
        // Add logic here if necessary to run the kernel
    }

    handleSystemCall(syscall, args) {
        return this.syscallManager.handleSystemCall(syscall, args);
    }
}

module.exports = Kernel;
