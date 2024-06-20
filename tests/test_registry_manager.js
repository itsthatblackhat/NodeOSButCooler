const RegistryManager = require('../registry/registry_manager.js');
const registryManager = new RegistryManager();

function runRegistryManagerTests() {
    console.log("Running registry manager tests...");
    registryManager.initialize();

    // Create a key
    try {
        registryManager.createKey('HKEY_LOCAL_MACHINE', 'Software\\Test');
        console.log('Registry key created.');
    } catch (error) {
        console.error('Error creating registry key:', error);
    }

    // Set values
    try {
        registryManager.setValue('HKEY_LOCAL_MACHINE', 'Software\\Test', 'Version', '1.0.0');
        registryManager.setValue('HKEY_LOCAL_MACHINE', 'Software\\Test', 'Author', 'NodeOS Developer');
        console.log('Registry values set.');
    } catch (error) {
        console.error('Error setting registry values:', error);
    }

    // Get values
    try {
        const version = registryManager.getValue('HKEY_LOCAL_MACHINE', 'Software\\Test', 'Version');
        console.log(`Version: ${version}`);
        const author = registryManager.getValue('HKEY_LOCAL_MACHINE', 'Software\\Test', 'Author');
        console.log(`Author: ${author}`);
    } catch (error) {
        console.error('Error getting registry values:', error);
    }

    // List keys
    try {
        const keys = registryManager.listKeys('HKEY_LOCAL_MACHINE');
        console.log("Keys:", keys);
    } catch (error) {
        console.error('Error listing registry keys:', error);
    }

    // List values
    try {
        const values = registryManager.listValues('HKEY_LOCAL_MACHINE', 'Software\\Test');
        console.log("Values for HKEY_LOCAL_MACHINE\\Software\\Test:", values);
    } catch (error) {
        console.error('Error listing registry values:', error);
    }

    // Delete a value
    try {
        registryManager.deleteValue('HKEY_LOCAL_MACHINE', 'Software\\Test', 'Author');
        console.log("Deleted value 'Author'.");
    } catch (error) {
        console.error('Error deleting registry value:', error);
    }

    // Delete a key
    try {
        registryManager.deleteKey('HKEY_LOCAL_MACHINE', 'Software\\Test');
        console.log("Deleted key 'HKEY_LOCAL_MACHINE\\Software\\Test'.");
    } catch (error) {
        console.error('Error deleting registry key:', error);
    }

    console.log("Registry manager tests completed.");
}

runRegistryManagerTests();
