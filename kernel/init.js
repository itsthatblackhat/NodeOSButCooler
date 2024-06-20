/**
 * JSOS Initialization Script
 *
 * This script initializes the JSOS boot process.
 */

const osloader = require('./osloader.js');
const regboot = require('./regboot.js');
const ntfsBoot = require('./ntfs_boot');
const hardwareDetection = require('./hardware_detection');
const mainBoot = require('./main_boot');

// Define a mock loader parameter block (replace with actual parameters as needed)
const loaderParameterBlock = {
    systemRoot: 'D:\\JSOS' // Updated path to the project directory
};

// Start the NTFS boot process
const devicePath = '/dev/sda'; // Example device path, replace as necessary
ntfsBoot.ntfsBoot(devicePath);

// Start the hardware detection process
hardwareDetection.hardwareDetectionProcess();

// Set up the main boot process
mainBoot.mainBootProcess();

// Load the system hive
regboot.loadSystemHive(loaderParameterBlock.systemRoot);

// Compute the driver load list
const driverLoadList = regboot.computeDriverLoadList();
console.log('Driver Load List:', driverLoadList);

// Start the OS loader
osloader.loadOS(loaderParameterBlock);

console.log("System initialization complete.");
