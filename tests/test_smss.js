const SMSS = require('../subsys/smss.js');
const smss = new SMSS();

function runSmssTests() {
    console.log("Running SMSS tests...");
    smss.initialize();

    // Create a session
    const sessionInfo = { user: 'Test User', terminal: 'tty1' };
    const sessionId = smss.createSession(sessionInfo);

    // Get session info
    const info = smss.getSessionInfo(sessionId);
    console.log(`Session Info:`, info);

    // List all sessions
    const sessions = smss.listSessions();
    console.log("Sessions:", sessions);

    // Terminate the session
    smss.terminateSession(sessionId);

    // Handle client requests
    const newSessionId = smss.handleClientRequest('createSession', { sessionInfo: { user: 'Another User', terminal: 'tty2' } });
    const sessionDetails = smss.handleClientRequest('getSessionInfo', { sessionId: newSessionId });
    console.log(`Session Details:`, sessionDetails);
    smss.handleClientRequest('terminateSession', { sessionId: newSessionId });

    console.log("SMSS tests completed.");
}

runSmssTests();
