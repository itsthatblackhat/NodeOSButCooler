const DriverManager = require('../drivers/driver_manager');
const driverManager = new DriverManager();

function runDriverManagerTests() {
    console.log("Running driver manager tests...");
    driverManager.initialize();

    // Load a driver
    const driverName = 'TestDriver';
    const driverPath = '/path/to/test_driver';
    const driverId = driverManager.loadDriver(driverName, driverPath, { autoLoad: true });
    console.log(`Driver loaded with ID ${driverId}`);

    // Get driver info
    const info = driverManager.getDriverInfo(driverId);
    console.log(`Driver Info:`, info);

    // List all drivers
    const drivers = driverManager.listDrivers();
    console.log("Drivers:", drivers);

    // Unload the driver
    driverManager.unloadDriver(driverId);
    console.log(`Driver with ID ${driverId} unloaded`);

    console.log("Driver manager tests completed.");
}

runDriverManagerTests();
