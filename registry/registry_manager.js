const fs = require('fs');
const path = require('path');

class RegistryManager {
    constructor() {
        this.registryFilePath = path.join(__dirname, 'registry.json');
        this.registryData = {};
    }

    initialize() {
        console.log("Initializing Registry Manager...");
        this._loadRegistry();
        console.log("Registry Manager initialized.");
    }

    _loadRegistry() {
        try {
            if (fs.existsSync(this.registryFilePath)) {
                const data = fs.readFileSync(this.registryFilePath, 'utf8');
                this.registryData = JSON.parse(data);
                console.log("Registry loaded from file.");
            } else {
                this.registryData = {};
                console.log("No registry file found, starting with empty registry.");
            }
        } catch (error) {
            console.error("Failed to load registry:", error);
            this.registryData = {};
        }
    }

    _saveRegistry() {
        try {
            const data = JSON.stringify(this.registryData, null, 2);
            fs.writeFileSync(this.registryFilePath, data, 'utf8');
            console.log("Registry saved to file.");
        } catch (error) {
            console.error("Failed to save registry:", error);
        }
    }

    createKey(key) {
        if (this.registryData[key]) {
            throw new Error(`Key "${key}" already exists`);
        }
        this.registryData[key] = {};
        this._saveRegistry();
        console.log(`Key "${key}" created.`);
    }

    deleteKey(key) {
        if (!this.registryData[key]) {
            throw new Error(`Key "${key}" not found`);
        }
        delete this.registryData[key];
        this._saveRegistry();
        console.log(`Key "${key}" deleted.`);
    }

    setValue(key, valueName, value) {
        if (!this.registryData[key]) {
            throw new Error(`Key "${key}" not found`);
        }
        this.registryData[key][valueName] = value;
        this._saveRegistry();
        console.log(`Value "${valueName}" set for key "${key}".`);
    }

    getValue(key, valueName) {
        if (!this.registryData[key]) {
            throw new Error(`Key "${key}" not found`);
        }
        return this.registryData[key][valueName];
    }

    deleteValue(key, valueName) {
        if (!this.registryData[key]) {
            throw new Error(`Key "${key}" not found`);
        }
        delete this.registryData[key][valueName];
        this._saveRegistry();
        console.log(`Value "${valueName}" deleted from key "${key}".`);
    }

    listKeys() {
        return Object.keys(this.registryData);
    }

    listValues(key) {
        if (!this.registryData[key]) {
            throw new Error(`Key "${key}" not found`);
        }
        return Object.keys(this.registryData[key]);
    }

    closeKey(key) {
        // Placeholder for closing a key
        console.log(`Registry key ${key} closed.`);
    }
}

module.exports = RegistryManager;
