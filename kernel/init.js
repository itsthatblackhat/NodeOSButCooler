
/**
 * JSOS Initialization Script
 * 
 * This script initializes the JSOS boot process.
 */

const osloader = require('./osloader.js');
const regboot = require('./regboot.js');

// Define a mock loader parameter block (replace with actual parameters as needed)
const loaderParameterBlock = {
    systemRoot: 'C:\JSOS' // Example path, replace as necessary
};

// Load the system hive
regboot.loadSystemHive(loaderParameterBlock.systemRoot);

// Compute the driver load list
const driverLoadList = regboot.computeDriverLoadList();
console.log('Driver Load List:', driverLoadList);

// Start the OS loader
osloader.loadOS(loaderParameterBlock);
