const DriverManager = require('../drivers/driver_manager.js');
const driverManager = new DriverManager();

function runDriverManagerTests() {
    console.log("Running Driver Manager tests...");
    driverManager.initialize();

    // Load a driver
    const driverId1 = driverManager.loadDriver('Test Driver', '/path/to/test_driver', { version: '1.0' });
    console.log(`Driver loaded with ID ${driverId1}`);

    // Get driver info
    const driverInfo1 = driverManager.getDriverInfo(driverId1);
    console.log(`Driver Info:`, driverInfo1);

    // Load driver dependencies
    driverManager.loadDriverDependencies(driverId1);

    // Initialize the driver
    driverManager.initializeDriver(driverId1);

    // Unload the driver
    driverManager.unloadDriver(driverId1);

    // Load another driver
    const driverId2 = driverManager.loadDriver('Another Driver', '/path/to/another_driver', { version: '2.0' });
    console.log(`Driver loaded with ID ${driverId2}`);

    // Get driver info
    const driverInfo2 = driverManager.getDriverInfo(driverId2);
    console.log(`Driver Info:`, driverInfo2);

    // List all drivers
    const drivers = driverManager.listDrivers();
    console.log("Drivers:", drivers);

    console.log("Driver Manager tests completed.");
}

runDriverManagerTests();
