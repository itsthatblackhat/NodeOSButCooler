class DriverManager {
    constructor() {
        this.drivers = new Map(); // Maps driverId to driver information
        this.nextDriverId = 1;
    }

    initialize() {
        console.log("Initializing Driver Manager...");
        this._setupDrivers();
        console.log("Driver Manager initialized.");
    }

    _setupDrivers() {
        console.log("Setting up initial drivers...");
        // Simulate setting up initial drivers
    }

    loadDriver(driverName, driverPath, options) {
        const driverId = this.nextDriverId++;
        console.log(`Loading driver ${driverId}: ${driverName}`);

        const driverInfo = {
            id: driverId,
            name: driverName,
            path: driverPath,
            options,
            status: 'loaded'
        };

        this.drivers.set(driverId, driverInfo);
        console.log(`Driver ${driverName} loaded.`);
        return driverId;
    }

    unloadDriver(driverId) {
        console.log(`Unloading driver ${driverId}`);
        const driver = this.drivers.get(driverId);
        if (!driver) {
            throw new Error(`Driver with ID ${driverId} not found`);
        }
        driver.status = 'unloaded';
        this.drivers.delete(driverId);
        console.log(`Driver ${driverId} unloaded.`);
    }

    getDriverInfo(driverId) {
        console.log(`Getting info for driver ${driverId}`);
        const driver = this.drivers.get(driverId);
        if (!driver) {
            throw new Error(`Driver with ID ${driverId} not found`);
        }
        return driver;
    }

    listDrivers() {
        console.log("Listing all drivers...");
        return Array.from(this.drivers.values());
    }
}

module.exports = DriverManager;
