const fs = require('fs');
const path = require('path');
const ntfsBoot = require('./ntfs_boot');
const mbrBoot = require('./mbr_boot');

const diskImagePath = path.join(__dirname, 'mock_disk.img');

let BlRebootSystem = false;

// Define transfer entry of loaded image
function transferRoutine(loaderParameterBlock) {
    console.log("Transferring control to the loaded image...");
    // Implement transfer logic
}

// Main function to load the OS
function loadOS(argv) {
    console.log("Starting JSOS loader...");

    if (!fs.existsSync(diskImagePath)) {
        console.error("Disk image not found");
        return false;
    }

    const diskImage = fs.readFileSync(diskImagePath);

    // Example logic to simulate reading system and boot partitions from the disk image
    const systemPartitionOffset = 512; // Assume system partition starts at sector 1 (512 bytes offset)
    const bootPartitionOffset = systemPartitionOffset + (1 * 1024 * 1024); // Assume boot partition starts after 1 MB

    const systemPartition = diskImage.slice(systemPartitionOffset, systemPartitionOffset + (1 * 1024 * 1024));
    const bootPartition = diskImage.slice(bootPartitionOffset, bootPartitionOffset + (1 * 1024 * 1024));
    const consoleInputDevice = {}; // Simulated console input device

    console.log("System, boot partitions, and console input device opened successfully");

    // Initialize MBR
    const mbrResult = mbrBoot.initializeMBR();
    if (!mbrResult) {
        return false;
    }

    // Load NTFS boot code
    const ntfsResult = ntfsBoot.loadNTLDR();
    if (!ntfsResult) {
        return false;
    }

    transferRoutine({});
    return true;
}

module.exports = {
    loadOS
};
