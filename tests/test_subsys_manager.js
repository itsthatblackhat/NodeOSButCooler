const SubsystemManager = require('../subsys/subsys_manager');
const subsystemManager = new SubsystemManager();

function runSubsystemManagerTests() {
    console.log("Running subsystem manager tests...");
    subsystemManager.initialize();

    // List subsystems
    const subsystems = subsystemManager.listSubsystems();
    console.log("Subsystems:", subsystems);

    // Test CSRSS subsystem
    const processId = 1;
    const processInfo = { name: 'Test Process', priority: 'normal' };
    subsystemManager.sendSubsystemRequest('CSRSS', 'createProcess', { processId, processInfo });
    const csrss = subsystemManager.getSubsystem('CSRSS');
    const info = csrss.getProcessInfo(processId);
    console.log(`Process Info from CSRSS:`, info);
    subsystemManager.sendSubsystemRequest('CSRSS', 'sendMessage', { processId, message: 'Hello, Process!' });
    subsystemManager.sendSubsystemRequest('CSRSS', 'terminateProcess', { processId });

    // Test SMSS subsystem
    const sessionId = subsystemManager.sendSubsystemRequest('SMSS', 'createSession', { sessionInfo: { user: 'testUser' } });
    const smss = subsystemManager.getSubsystem('SMSS');
    const sessionInfo = smss.getSessionInfo(sessionId);
    console.log(`Session Info from SMSS:`, sessionInfo);
    subsystemManager.sendSubsystemRequest('SMSS', 'terminateSession', { sessionId });

    console.log("Subsystem manager tests completed.");
}

runSubsystemManagerTests();
