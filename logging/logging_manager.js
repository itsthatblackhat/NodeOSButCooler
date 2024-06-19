const fs = require('fs');
const path = require('path');

class LoggingManager {
    constructor() {
        this.logFilePath = path.join(__dirname, 'system.log');
    }

    initialize() {
        console.log("Initializing Logging Manager...");
        this._setupLogging();
        console.log("Logging Manager initialized.");
    }

    _setupLogging() {
        console.log("Setting up logging components...");
        // Ensure log file exists
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '', 'utf8');
        }
    }

    log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} [${level}] ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage, 'utf8');
        console.log(logMessage.trim());
    }

    error(message) {
        this.log(message, 'ERROR');
    }

    warn(message) {
        this.log(message, 'WARN');
    }

    info(message) {
        this.log(message, 'INFO');
    }

    debug(message) {
        this.log(message, 'DEBUG');
    }

    getLogs() {
        return fs.readFileSync(this.logFilePath, 'utf8');
    }

    clearLogs() {
        fs.writeFileSync(this.logFilePath, '', 'utf8');
        console.log("Logs cleared.");
    }
}

module.exports = LoggingManager;
