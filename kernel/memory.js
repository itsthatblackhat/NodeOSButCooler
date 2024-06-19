class MemoryManager {
    constructor() {
        this.memoryMap = new Map();
    }

    allocateMemory(pid, size) {
        console.log(`Allocating ${size} bytes for process ${pid}`);
        if (!this.memoryMap.has(pid)) {
            this.memoryMap.set(pid, []);
        }
        this.memoryMap.get(pid).push(size);
    }

    freeMemory(pid) {
        console.log(`Freeing memory for process ${pid}`);
        this.memoryMap.delete(pid);
    }

    getMemoryUsage(pid) {
        return this.memoryMap.get(pid) || [];
    }
}

module.exports = new MemoryManager();
