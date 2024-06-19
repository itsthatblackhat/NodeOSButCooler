const EventEmitter = require('events');

class ProcessManager extends EventEmitter {
    constructor() {
        super();
        this.processTable = new Map();
        this.threadTable = new Map();
        this.nextProcessId = 1;
        this.nextThreadId = 1;
    }

    initialize() {
        console.log("Initializing Process Manager...");
        this.on('createProcess', this.createProcess.bind(this));
        this.on('terminateProcess', this.terminateProcess.bind(this));
        this.on('createThread', this.createThread.bind(this));
        this.on('terminateThread', this.terminateThread.bind(this));
        this.on('schedule', this.schedule.bind(this));
        this.on('ipc', this.handleIPC.bind(this));
        console.log("Process Manager initialized.");
    }

    createProcess(desiredAccess, objectAttributes, parentProcessId, inheritObjectTable, sectionHandle, debugPort, exceptionPort) {
        const processId = this.nextProcessId++;
        console.log(`Creating process ${processId}`);

        const processInfo = {
            id: processId,
            access: desiredAccess,
            attributes: objectAttributes,
            parentId: parentProcessId,
            status: 'created',
            threads: [],
            objectTable: inheritObjectTable ? this.processTable.get(parentProcessId).objectTable : {},
            sectionHandle,
            debugPort,
            exceptionPort,
            basePriority: 8,
            activeThreads: 0,
            cpuTime: 0
        };

        this.processTable.set(processId, processInfo);
        this.readyProcessForExecution(processId);

        return processId;
    }

    readyProcessForExecution(processId) {
        const process = this.processTable.get(processId);
        if (!process) {
            console.error(`Process ${processId} not found`);
            return;
        }
        process.status = 'ready';
        console.log(`Process ${processId} is ready for execution`);
        this.schedule();
    }

    terminateProcess(processId) {
        console.log(`Terminating process ${processId}`);
        const process = this.processTable.get(processId);
        if (!process) {
            console.error(`Process ${processId} not found`);
            return;
        }
        process.status = 'terminated';
        process.threads.forEach(threadId => this.terminateThread(threadId));
        this.processTable.delete(processId);
        console.log(`Process ${processId} terminated`);
    }

    createThread(processId, startAddress, stackSize, priority) {
        const threadId = this.nextThreadId++;
        console.log(`Creating thread ${threadId} for process ${processId}`);

        const threadInfo = {
            id: threadId,
            processId: processId,
            startAddress: startAddress,
            stackSize: stackSize,
            priority: priority,
            status: 'ready',
            cpuTime: 0
        };

        const process = this.processTable.get(processId);
        if (!process) {
            console.error(`Process ${processId} not found`);
            return;
        }

        process.threads.push(threadId);
        this.threadTable.set(threadId, threadInfo);
        process.activeThreads++;
        console.log(`Thread ${threadId} created for process ${processId}`);
        this.schedule();
    }

    terminateThread(threadId) {
        console.log(`Terminating thread ${threadId}`);
        const thread = this.threadTable.get(threadId);
        if (!thread) {
            console.error(`Thread ${threadId} not found`);
            return;
        }
        thread.status = 'terminated';
        const process = this.processTable.get(thread.processId);
        if (process) {
            process.threads = process.threads.filter(id => id !== threadId);
            process.activeThreads--;
        }
        this.threadTable.delete(threadId);
        console.log(`Thread ${threadId} terminated`);
    }

    schedule() {
        console.log("Scheduling processes and threads...");
        // Example logic: just run all ready threads in a round-robin fashion
        for (let thread of this.threadTable.values()) {
            if (thread.status === 'ready') {
                this.runThread(thread);
            }
        }
    }

    runThread(thread) {
        console.log(`Running thread ${thread.id} of process ${thread.processId}`);
        thread.status = 'running';
        setTimeout(() => {
            thread.cpuTime += 1; // Simulate CPU time
            thread.status = 'ready';
            console.log(`Thread ${thread.id} of process ${thread.processId} completed its time slice`);
        }, 1000); // Simulate a time slice of 1 second
    }

    handleIPC(message, senderProcessId, receiverProcessId) {
        console.log(`Handling IPC message from ${senderProcessId} to ${receiverProcessId}: ${message}`);
        const receiverProcess = this.processTable.get(receiverProcessId);
        if (receiverProcess) {
            // Simulate message delivery
            receiverProcess.messageQueue = receiverProcess.messageQueue || [];
            receiverProcess.messageQueue.push({ message, sender: senderProcessId });
            console.log(`Message delivered to process ${receiverProcessId}`);
        } else {
            console.error(`Receiver process ${receiverProcessId} not found`);
        }
    }

    getProcessInfo(processId) {
        return this.processTable.get(processId);
    }

    getThreadInfo(threadId) {
        return this.threadTable.get(threadId);
    }
}

module.exports = ProcessManager;
