// events/event_viewer.js
const EventManager = require('./event_manager');

class EventViewer {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }

    displayLogs() {
        const logs = this.eventManager.getLogs();
        console.log("Event Logs:");
        logs.forEach(log => {
            console.log(`[${log.timestamp}] ${log.type}: ${JSON.stringify(log.data)}`);
        });
    }
}

module.exports = EventViewer;
