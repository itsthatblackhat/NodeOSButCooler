const PnPManager = require('../pnp/pnp_manager');
const pnpManager = new PnPManager();

function runPnPManagerTests() {
    console.log("Running PnP manager tests...");
    pnpManager.initialize();

    // Add a device
    const deviceInfo = { name: 'Test Device', type: 'USB', vendor: 'TestVendor' };
    const deviceId = pnpManager.addDevice(deviceInfo);
    console.log(`Device added with ID ${deviceId}`);

    // Get device info
    const info = pnpManager.getDeviceInfo(deviceId);
    console.log(`Device Info:`, info);

    // Handle device requests
    const readResult = pnpManager.handleDeviceRequest(deviceId, 'read', { buffer: Buffer.alloc(1024) });
    console.log(`Read Result: ${readResult}`);

    const writeResult = pnpManager.handleDeviceRequest(deviceId, 'write', { buffer: Buffer.from('Hello Device!') });
    console.log(`Write Result: ${writeResult}`);

    const controlResult = pnpManager.handleDeviceRequest(deviceId, 'control', { command: 'reset' });
    console.log(`Control Result: ${controlResult}`);

    // List all devices
    const devices = pnpManager.listDevices();
    console.log("Devices:", devices);

    // Remove the device
    pnpManager.removeDevice(deviceId);
    console.log(`Device with ID ${deviceId} removed`);

    console.log("PnP manager tests completed.");
}

runPnPManagerTests();
