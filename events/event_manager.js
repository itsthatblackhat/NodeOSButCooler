// events/event_manager.js
class EventManager {
    constructor() {
        this.listeners = {};
        this.logs = [];
    }

    initialize() {
        console.log("Initializing Event Manager...");
        // Additional initialization logic if needed
    }

    emitEvent(eventType, data) {
        const event = { eventType, data, timestamp: new Date() };
        this.logs.push(event);
        if (this.listeners[eventType]) {
            this.listeners[eventType].forEach(listener => listener(event));
        }
        console.log(`Event emitted: ${eventType}`, data);
    }

    registerListener(eventType, listener) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(listener);
    }

    getLogs() {
        return this.logs;
    }

    getEvents() {
        return this.logs;
    }
}

module.exports = EventManager;
