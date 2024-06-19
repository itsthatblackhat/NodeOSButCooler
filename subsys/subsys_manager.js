const CSRSS = require('./csrss.js');
const SMSS = require('./smss.js');

class SubsystemManager {
    constructor() {
        this.subsystems = new Map();
        this.subsystemStatus = new Map();
    }

    initialize() {
        console.log("Initializing Subsystem Manager...");
        try {
            this._initializeSubsystems();
            console.log("Subsystem Manager initialized successfully.");
        } catch (error) {
            console.error("Error initializing Subsystem Manager:", error);
            throw error;
        }
    }

    _initializeSubsystems() {
        console.log("Setting up subsystems...");

        this._initializeSubsystem('CSRSS', CSRSS);
        this._initializeSubsystem('SMSS', SMSS);

        // Additional subsystems can be initialized here
    }

    _initializeSubsystem(name, SubsystemClass) {
        console.log(`Initializing ${name} subsystem...`);
        const subsystem = new SubsystemClass();
        subsystem.initialize();
        this.subsystems.set(name, subsystem);
        this.subsystemStatus.set(name, 'initialized');
        console.log(`${name} subsystem initialized.`);
    }

    getSubsystem(name) {
        console.log(`Retrieving subsystem: ${name}`);
        const subsystem = this.subsystems.get(name);
        if (!subsystem) {
            throw new Error(`Subsystem ${name} not found`);
        }
        return subsystem;
    }

    sendSubsystemRequest(subsystemName, requestType, requestData) {
        console.log(`Sending request to subsystem ${subsystemName}: ${requestType}`);
        const subsystem = this.getSubsystem(subsystemName);
        return subsystem.handleClientRequest(requestType, requestData);
    }

    listSubsystems() {
        console.log("Listing all subsystems...");
        return Array.from(this.subsystems.keys());
    }

    getSubsystemStatus(subsystemName) {
        console.log(`Getting status for subsystem: ${subsystemName}`);
        const status = this.subsystemStatus.get(subsystemName);
        if (!status) {
            throw new Error(`Status for subsystem ${subsystemName} not found`);
        }
        return status;
    }
}

module.exports = SubsystemManager;
