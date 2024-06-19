class PNP {
    constructor() {
        this.devices = new Map();
    }

    initializePnp() {
        console.log("PNP initialized");
    }

    manageDevices(deviceId, action) {
        console.log(`Managing device ${deviceId} with action ${action}`);
        const device = this.devices.get(deviceId);
        if (device) {
            switch(action) {
                case 'enable':
                    device.status = 'enabled';
                    break;
                case 'disable':
                    device.status = 'disabled';
                    break;
                default:
                    throw new Error(`Unsupported action: ${action}`);
            }
        } else {
            console.error(`Device ${deviceId} not found`);
        }
    }

    allocateResources(deviceId, resource) {
        console.log(`Allocating resource ${resource} for device ${deviceId}`);
        const device = this.devices.get(deviceId);
        if (device) {
            device.resources.push(resource);
        } else {
            console.error(`Device ${deviceId} not found`);
        }
    }

    addDevice(deviceId, deviceInfo) {
        console.log(`Adding device ${deviceId}`);
        this.devices.set(deviceId, deviceInfo);
    }

    removeDevice(deviceId) {
        console.log(`Removing device ${deviceId}`);
        this.devices.delete(deviceId);
    }

    getDeviceInfo(deviceId) {
        return this.devices.get(deviceId);
    }
}

module.exports = new PNP();
