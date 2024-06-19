const RegistryManager = require('../registry/registry_manager');
const registryManager = new RegistryManager();

function runRegistryManagerTests() {
    console.log("Running registry manager tests...");
    registryManager.initialize();

    // Create a key
    registryManager.createKey('HKEY_LOCAL_MACHINE\\Software\\Test');

    // Set values
    registryManager.setValue('HKEY_LOCAL_MACHINE\\Software\\Test', 'Version', '1.0.0');
    registryManager.setValue('HKEY_LOCAL_MACHINE\\Software\\Test', 'Author', 'NodeOS Developer');

    // Get values
    const version = registryManager.getValue('HKEY_LOCAL_MACHINE\\Software\\Test', 'Version');
    console.log(`Version: ${version}`);
    const author = registryManager.getValue('HKEY_LOCAL_MACHINE\\Software\\Test', 'Author');
    console.log(`Author: ${author}`);

    // List keys
    const keys = registryManager.listKeys();
    console.log("Keys:", keys);

    // List values
    const values = registryManager.listValues('HKEY_LOCAL_MACHINE\\Software\\Test');
    console.log("Values for HKEY_LOCAL_MACHINE\\Software\\Test:", values);

    // Delete a value
    registryManager.deleteValue('HKEY_LOCAL_MACHINE\\Software\\Test', 'Author');
    console.log("Deleted value 'Author'.");

    // Delete a key
    registryManager.deleteKey('HKEY_LOCAL_MACHINE\\Software\\Test');
    console.log("Deleted key 'HKEY_LOCAL_MACHINE\\Software\\Test'.");

    console.log("Registry manager tests completed.");
}

runRegistryManagerTests();
