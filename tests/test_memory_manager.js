const MemoryManager = require('../memory/memory_manager');
const memoryManager = new MemoryManager();

function runMemoryManagerTests() {
    console.log("Running memory manager tests...");
    memoryManager.initialize();

    // Allocate memory for a process
    const processId1 = 1;
    const address1 = memoryManager.allocateVirtualMemory(processId1, null, 0, 256 * 1024 * 1024, 0, 0); // 256MB
    console.log(`Memory allocated at address ${address1} for process ${processId1}`);

    // Allocate more memory for the same process
    const address2 = memoryManager.allocateVirtualMemory(processId1, null, 0, 128 * 1024 * 1024, 0, 0); // 128MB
    console.log(`Memory allocated at address ${address2} for process ${processId1}`);

    // Free some memory
    memoryManager.freeVirtualMemory(processId1, address1, 256 * 1024 * 1024, 0);
    console.log(`Memory freed at address ${address1} for process ${processId1}`);

    // Simulate a page fault
    memoryManager.handlePageFault(address2 + 1024); // Access within allocated block

    // Simulate memory swapping
    memoryManager.swapOut(processId1);
    memoryManager.swapIn(processId1);

    // Display memory usage
    const memoryUsage = memoryManager.getMemoryUsage();
    console.log("Memory Usage:", memoryUsage);

    // Display process memory info
    const processMemoryInfo = memoryManager.getProcessMemoryInfo(processId1);
    console.log(`Memory Info for Process ${processId1}:`, processMemoryInfo);

    console.log("Memory manager tests completed.");
}

runMemoryManagerTests();
