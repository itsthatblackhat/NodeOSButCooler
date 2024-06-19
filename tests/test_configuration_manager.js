const ConfigurationManager = require('../configuration/configuration_manager.js');
const configManager = new ConfigurationManager();

function runConfigurationManagerTests() {
    console.log("Running configuration manager tests...");
    configManager.initialize();

    // Set configuration settings
    configManager.setConfig('system.timeout', '30s');
    configManager.setConfig('system.theme', 'dark');
    configManager.setConfig('user.language', 'en-US');

    // Get configuration settings
    const timeout = configManager.getConfig('system.timeout');
    console.log(`system.timeout: ${timeout}`);
    const theme = configManager.getConfig('system.theme');
    console.log(`system.theme: ${theme}`);
    const language = configManager.getConfig('user.language');
    console.log(`user.language: ${language}`);

    // List all configuration settings
    const configs = configManager.listConfigs();
    console.log("Configuration settings:", configs);

    // Delete a configuration setting
    configManager.deleteConfig('system.theme');
    console.log("Deleted configuration setting 'system.theme'.");

    // Clear all configuration settings
    configManager.clearConfigs();
    console.log("Cleared all configuration settings.");

    console.log("Configuration manager tests completed.");
}

runConfigurationManagerTests();
