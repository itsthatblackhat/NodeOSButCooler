const MemoryManager = require('../memory/memory_manager.js');
const memoryManager = new MemoryManager();

function runMemoryTests() {
    console.log("Running memory tests...");
    memoryManager.initialize();
    const address = memoryManager.allocateVirtualMemory(1, null, 0, 1024, 0, 0);
    console.log(`Memory allocated at address ${address}`);
    memoryManager.freeVirtualMemory(1, address, 1024, 0);
    console.log("Memory tests completed.");
}

runMemoryTests();
