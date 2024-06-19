const LoggingManager = require('../logging/logging_manager');
const loggingManager = new LoggingManager();

function runLoggingManagerTests() {
    console.log("Running logging manager tests...");
    loggingManager.initialize();

    // Log different levels of messages
    loggingManager.info("This is an informational message.");
    loggingManager.warn("This is a warning message.");
    loggingManager.error("This is an error message.");
    loggingManager.debug("This is a debug message.");

    // Retrieve and display logs
    const logs = loggingManager.getLogs();
    console.log("Logs:");
    console.log(logs);

    // Clear logs
    loggingManager.clearLogs();
    console.log("Logs after clearing:");
    console.log(loggingManager.getLogs());

    console.log("Logging manager tests completed.");
}

runLoggingManagerTests();
