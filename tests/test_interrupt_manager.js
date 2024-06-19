const InterruptManager = require('../kernel/interrupt_manager.js');
const interruptManager = new InterruptManager();

function runInterruptManagerTests() {
    console.log("Running interrupt manager tests...");
    interruptManager.initialize();

    // Register a test interrupt handler
    interruptManager.registerInterrupt('testInterrupt', (arg1, arg2) => {
        console.log(`Test interrupt handled with args: ${arg1}, ${arg2}`);
        return `Handled ${arg1} and ${arg2}`;
    });

    // Handle the test interrupt
    try {
        const result = interruptManager.handleInterrupt('testInterrupt', 'arg1', 'arg2');
        console.log(`Interrupt handled result: ${result}`);
    } catch (error) {
        console.error("Interrupt test failed:", error.message);
    }

    console.log("Interrupt manager tests completed.");
}

runInterruptManagerTests();
