// File: D:\JSOS\kernel\process_manager.js

// Define the Process Control Block (PCB)
class PCB {
    constructor(pid, state, priority, programCounter, registers, memory) {
        this.pid = pid; // Process ID
        this.state = state; // Process State
        this.priority = priority; // Process Priority
        this.programCounter = programCounter; // Program Counter
        this.registers = registers; // CPU Registers
        this.memory = memory; // Memory allocated to the process
    }
}

// Process States
const ProcessState = {
    NEW: 'NEW',
    READY: 'READY',
    RUNNING: 'RUNNING',
    WAITING: 'WAITING',
    TERMINATED: 'TERMINATED'
};

// Time Quantum for Round Robin Scheduling
const TIME_QUANTUM = 5;

// Define a message queue for IPC
class MessageQueue {
    constructor() {
        this.queue = [];
    }

    sendMessage(message) {
        this.queue.push(message);
        console.log(`Message sent: ${JSON.stringify(message)}`);
    }

    receiveMessage() {
        if (this.queue.length > 0) {
            const message = this.queue.shift();
            console.log(`Message received: ${JSON.stringify(message)}`);
            return message;
        } else {
            console.log('No messages in the queue.');
            return null;
        }
    }
}

class ProcessManager {
    constructor() {
        this.processTable = [];
        this.globalMessageQueue = new MessageQueue();
        this.currentProcessIndex = 0;
    }

    initialize() {
        console.log("Initializing Process Manager...");
        this.processTable = [];
        this.currentProcessIndex = 0;
        console.log("Process Manager initialized.");
    }

    createProcess(pid, priority) {
        const newProcess = new PCB(pid, ProcessState.NEW, priority, 0, {}, null);
        this.processTable.push(newProcess);
        newProcess.state = ProcessState.READY;
        console.log(`Process ${pid} created and set to READY state.`);
        return newProcess.pid;
    }

    terminateProcess(pid) {
        const process = this.processTable.find(p => p.pid === pid);
        if (process) {
            process.state = ProcessState.TERMINATED;
            console.log(`Process ${pid} terminated.`);
        } else {
            console.error(`Process ${pid} not found.`);
        }
    }

    getProcessInfo(pid) {
        return this.processTable.find(p => p.pid === pid);
    }

    roundRobinScheduling() {
        const schedule = () => {
            if (this.processTable.length === 0) {
                console.log('No processes to schedule.');
                return;
            }

            const currentProcess = this.processTable[this.currentProcessIndex];
            if (currentProcess.state === ProcessState.READY || currentProcess.state === ProcessState.RUNNING) {
                currentProcess.state = ProcessState.RUNNING;
                console.log(`Running process ${currentProcess.pid}`);

                // Simulate process execution for a time quantum
                setTimeout(() => {
                    currentProcess.state = ProcessState.READY;
                    console.log(`Process ${currentProcess.pid} time quantum ended, switching context.`);

                    // Move to the next process
                    this.currentProcessIndex = (this.currentProcessIndex + 1) % this.processTable.length;
                    schedule();
                }, TIME_QUANTUM * 1000);
            } else {
                // Move to the next process if the current one is not ready/running
                this.currentProcessIndex = (this.currentProcessIndex + 1) % this.processTable.length;
                schedule();
            }
        };

        // Start scheduling
        schedule();
    }

    priorityScheduling() {
        const schedule = () => {
            if (this.processTable.length === 0) {
                console.log('No processes to schedule.');
                return;
            }

            // Sort processes by priority (higher priority first)
            this.processTable.sort((a, b) => b.priority - a.priority);

            for (const process of this.processTable) {
                if (process.state === ProcessState.READY) {
                    process.state = ProcessState.RUNNING;
                    console.log(`Running process ${process.pid} with priority ${process.priority}`);

                    // Simulate process execution
                    setTimeout(() => {
                        process.state = ProcessState.READY;
                        console.log(`Process ${process.pid} execution completed, switching context.`);
                        schedule();
                    }, TIME_QUANTUM * 1000);
                    break;
                }
            }
        };

        // Start scheduling
        schedule();
    }

    sendMessage(pid, message) {
        this.globalMessageQueue.sendMessage({ pid, message });
    }

    receiveMessage() {
        return this.globalMessageQueue.receiveMessage();
    }

    listProcesses() {
        return this.processTable;
    }

    suspendProcess(pid) {
        const process = this.processTable.find(p => p.pid === pid);
        if (process && process.state === ProcessState.RUNNING) {
            process.state = ProcessState.WAITING;
            console.log(`Process ${pid} suspended.`);
        } else {
            console.error(`Process ${pid} not found or not running.`);
        }
    }

    resumeProcess(pid) {
        const process = this.processTable.find(p => p.pid === pid);
        if (process && process.state === ProcessState.WAITING) {
            process.state = ProcessState.READY;
            console.log(`Process ${pid} resumed.`);
        } else {
            console.error(`Process ${pid} not found or not suspended.`);
        }
    }
}

module.exports = ProcessManager;
