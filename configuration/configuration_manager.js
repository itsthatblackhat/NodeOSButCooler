const fs = require('fs');
const path = require('path');

class ConfigurationManager {
    constructor() {
        this.configFilePath = path.join(__dirname, 'config.json');
        this.configData = {};
    }

    initialize() {
        console.log("Initializing Configuration Manager...");
        this._loadConfiguration();
        console.log("Configuration Manager initialized.");
    }

    _loadConfiguration() {
        try {
            if (fs.existsSync(this.configFilePath)) {
                const data = fs.readFileSync(this.configFilePath, 'utf8');
                this.configData = JSON.parse(data);
                console.log("Configuration loaded from file.");
            } else {
                this.configData = {};
                console.log("No configuration file found, starting with default configuration.");
            }
        } catch (error) {
            console.error("Failed to load configuration:", error);
            this.configData = {};
        }
    }

    _saveConfiguration() {
        try {
            const data = JSON.stringify(this.configData, null, 2);
            fs.writeFileSync(this.configFilePath, data, 'utf8');
            console.log("Configuration saved to file.");
        } catch (error) {
            console.error("Failed to save configuration:", error);
        }
    }

    setConfig(key, value) {
        this.configData[key] = value;
        this._saveConfiguration();
        console.log(`Configuration setting "${key}" set to "${value}".`);
    }

    getConfig(key) {
        return this.configData[key];
    }

    deleteConfig(key) {
        delete this.configData[key];
        this._saveConfiguration();
        console.log(`Configuration setting "${key}" deleted.`);
    }

    listConfigs() {
        return Object.keys(this.configData);
    }

    clearConfigs() {
        this.configData = {};
        this._saveConfiguration();
        console.log("All configuration settings cleared.");
    }
}

module.exports = ConfigurationManager;
