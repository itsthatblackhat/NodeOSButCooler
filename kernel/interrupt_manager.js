class InterruptManager {
    constructor() {
        this.interruptHandlers = new Map();
    }

    initialize() {
        console.log("Initializing Interrupt Manager...");
        this._setupInterrupts();
        console.log("Interrupt Manager initialized.");
    }

    _setupInterrupts() {
        console.log("Setting up interrupt handlers...");
        // Define default interrupt handlers here
    }

    registerInterrupt(interruptId, handler) {
        console.log(`Registering interrupt handler for interrupt ${interruptId}`);
        this.interruptHandlers.set(interruptId, handler);
    }

    handleInterrupt(interruptId, ...args) {
        console.log(`Handling interrupt ${interruptId} with args:`, args);
        const interruptHandler = this.interruptHandlers.get(interruptId);
        if (!interruptHandler) {
            throw new Error(`Unknown interrupt ID: ${interruptId}`);
        }
        return interruptHandler(...args);
    }
}

module.exports = InterruptManager;
