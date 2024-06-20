const fs = require('fs');

// Mock function to simulate reading the boot sector
function readBootSectorMock() {
    const buffer = Buffer.alloc(512);
    // Fill the buffer with mock data (e.g., '0x90' for NOP instruction)
    buffer.fill(0x90);
    return buffer;
}

function loadBootstrapCode(buffer) {
    // Placeholder for loading bootstrap code
    console.log("Loading bootstrap code...");
    // Actual implementation would go here
}

function ntfsBoot(devicePath) {
    console.log("Starting NTFS boot process...");
    let bootSector;

    if (process.env.USE_MOCK) {
        bootSector = readBootSectorMock();
    } else {
        bootSector = readBootSector(devicePath);
    }

    loadBootstrapCode(bootSector);
    console.log("Boot process initialized.");
}

// Mocked readBootSector function
function readBootSector(devicePath) {
    const buffer = Buffer.alloc(512); // NTFS boot sector size
    const fd = fs.openSync(devicePath, 'r');
    fs.readSync(fd, buffer, 0, 512, 0);
    fs.closeSync(fd);
    return buffer;
}

// Export functions for testing
module.exports = {
    ntfsBoot,
    readBootSector,
    loadBootstrapCode,
    readBootSectorMock
};
