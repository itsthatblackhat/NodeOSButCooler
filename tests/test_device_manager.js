const DeviceManager = require('../device/device_manager');
const deviceManager = new DeviceManager();

function runDeviceManagerTests() {
    console.log("Running device manager tests...");
    deviceManager.initialize();

    // Create a device
    const deviceId = deviceManager.createDevice('Test Device', 'Generic', { removable: true });

    // Get device info
    const deviceInfo = deviceManager.getDeviceInfo(deviceId);
    console.log(`Device Info:`, deviceInfo);

    // Handle device requests
    const readResult = deviceManager.handleDeviceRequest(deviceId, 'read', { buffer: Buffer.alloc(1024), offset: 0, length: 512 });
    console.log(`Read Result: ${readResult}`);

    const writeResult = deviceManager.handleDeviceRequest(deviceId, 'write', { buffer: Buffer.from('Hello Device!'), offset: 0, length: 12 });
    console.log(`Write Result: ${writeResult}`);

    const controlResult = deviceManager.handleDeviceRequest(deviceId, 'control', { command: 'reset' });
    console.log(`Control Result: ${controlResult}`);

    // List all devices
    const devices = deviceManager.listDevices();
    console.log("Devices:", devices);

    // Delete the device
    deviceManager.deleteDevice(deviceId);

    console.log("Device manager tests completed.");
}

runDeviceManagerTests();
