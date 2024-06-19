// test_device_manager.js

const DeviceManager = require('../device/device_manager.js');

// Initialize Device Manager
const deviceManager = new DeviceManager();
deviceManager.initialize();

// Test Device Creation and Deletion
const deviceId1 = deviceManager.createDevice('Keyboard', 'Input', { manufacturer: 'Logitech', model: 'K120' });
console.log(`Device created with ID: ${deviceId1}`);

const deviceId2 = deviceManager.createDevice('Mouse', 'Input', { manufacturer: 'Logitech', model: 'M185' });
console.log(`Device created with ID: ${deviceId2}`);

deviceManager.listDevices();

deviceManager.deleteDevice(deviceId1);
console.log(`Device with ID ${deviceId1} deleted`);

deviceManager.listDevices();

// Test Plug and Play Functionality
deviceManager.plugDevice('device3', { name: 'Monitor', type: 'Display', characteristics: { manufacturer: 'Dell', model: 'U2419H' } });
deviceManager.unplugDevice(deviceId2);

deviceManager.listDevices();
