// test_memory_manager.js

const MemoryManager = require('../memory/memory_manager.js');

// Initialize Memory Manager
const memoryManager = new MemoryManager();
memoryManager.initialize();

// Test Memory Allocation and Deallocation
const processId = 1;
const allocationSize = 1024 * 1024; // 1 MB
const baseAddress = memoryManager.allocateVirtualMemory(processId, 0, 0, allocationSize, 'private', 'rw');
console.log(`Allocated virtual memory at address ${baseAddress}`);

memoryManager.freeVirtualMemory(processId, baseAddress, allocationSize, 'release');
console.log(`Freed virtual memory at address ${baseAddress}`);

// Test Paging
const pageAddress = memoryManager.allocatePage();
memoryManager.mapVirtualToPhysical(0x1000, pageAddress);
const physicalAddress = memoryManager.getPhysicalAddress(0x1000);
console.log(`Physical address for virtual address 0x1000: ${physicalAddress}`);

// Test Memory Protection
memoryManager.protectMemory(baseAddress, allocationSize);

// Test Memory Usage
const memoryUsage = memoryManager.getMemoryUsage();
console.log(`Memory Usage: Total: ${memoryUsage.totalMemory}, Free: ${memoryUsage.freeMemory}, Used: ${memoryUsage.usedMemory}`);

// Test Process Memory Info
const processMemoryInfo = memoryManager.getProcessMemoryInfo(processId);
console.log(`Process Memory Info for Process ${processId}: ${JSON.stringify(processMemoryInfo)}`);
