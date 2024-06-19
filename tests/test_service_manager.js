const ServiceManager = require('../services/service_manager.js');
const serviceManager = new ServiceManager();

function runServiceManagerTests() {
    console.log("Running service manager tests...");
    serviceManager.initialize();

    // Add a service
    const serviceName = 'TestService';
    const serviceExecutable = '/path/to/test_service';
    const serviceId = serviceManager.addService(serviceName, serviceExecutable, { autoStart: true });
    console.log(`Service added with ID ${serviceId}`);

    // Start the service
    serviceManager.startService(serviceName);

    // Get service info
    const info = serviceManager.getServiceInfo(serviceName);
    console.log(`Service Info:`, info);

    // List all services
    const services = serviceManager.listServices();
    console.log("Services:", services);

    // Stop the service
    serviceManager.stopService(serviceName);

    // Remove the service
    serviceManager.removeService(serviceName);
    console.log(`Service ${serviceName} removed`);

    console.log("Service manager tests completed.");
}

runServiceManagerTests();
