class ServiceManager {
    constructor() {
        this.services = new Map(); // Maps serviceName to service information
        this.nextServiceId = 1;
    }

    initialize() {
        console.log("Initializing Service Manager...");
        this._setupServices();
        console.log("Service Manager initialized.");
    }

    _setupServices() {
        console.log("Setting up services...");
        // Simulate setting up initial services
    }

    addService(serviceName, serviceExecutable, options) {
        const serviceId = this.nextServiceId++;
        console.log(`Adding service ${serviceId}: ${serviceName}`);

        const serviceInfo = {
            id: serviceId,
            name: serviceName,
            executable: serviceExecutable,
            options,
            status: 'stopped'
        };

        this.services.set(serviceName, serviceInfo);
        console.log(`Service ${serviceName} added.`);
        return serviceId;
    }

    removeService(serviceName) {
        console.log(`Removing service ${serviceName}`);
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }
        service.status = 'removed';
        this.services.delete(serviceName);
        console.log(`Service ${serviceName} removed.`);
    }

    startService(serviceName) {
        console.log(`Starting service ${serviceName}`);
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }
        // Simulate starting the service
        service.status = 'running';
        console.log(`Service ${serviceName} started.`);
    }

    stopService(serviceName) {
        console.log(`Stopping service ${serviceName}`);
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }
        // Simulate stopping the service
        service.status = 'stopped';
        console.log(`Service ${serviceName} stopped.`);
    }

    getServiceInfo(serviceName) {
        console.log(`Getting info for service ${serviceName}`);
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }
        return service;
    }

    listServices() {
        console.log("Listing all services...");
        return Array.from(this.services.values());
    }
}

module.exports = ServiceManager;
