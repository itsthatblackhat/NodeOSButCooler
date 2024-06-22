const fs = require('fs');
const path = require('path');

class RegistryManager {
    constructor() {
        this.registry = {};
        this.registryFile = path.join(__dirname, 'registry.json');
        this.loadRegistry();
    }

    loadRegistry() {
        if (fs.existsSync(this.registryFile)) {
            this.registry = JSON.parse(fs.readFileSync(this.registryFile));
        } else {
            this.registry = {};
        }
    }

    saveRegistry() {
        fs.writeFileSync(this.registryFile, JSON.stringify(this.registry, null, 2));
    }

    createKey(keyPath) {
        const keys = keyPath.split('\\');
        let current = this.registry;

        keys.forEach(key => {
            if (!current[key]) {
                current[key] = {};
            }
            current = current[key];
        });

        this.saveRegistry();
    }

    setValue(keyPath, valueName, value) {
        const keys = keyPath.split('\\');
        let current = this.registry;

        for (let i = 0; i < keys.length; i++) {
            if (!current[keys[i]]) {
                throw new Error(`Key "${keys.slice(0, i + 1).join('\\')}" not found`);
            }
            if (i === keys.length - 1) {
                current[keys[i]][valueName] = value;
            } else {
                current = current[keys[i]];
            }
        }

        this.saveRegistry();
    }

    getValue(keyPath, valueName) {
        const keys = keyPath.split('\\');
        let current = this.registry;

        for (let i = 0; i < keys.length; i++) {
            if (!current[keys[i]]) {
                throw new Error(`Key "${keys.slice(0, i + 1).join('\\')}" not found`);
            }
            if (i === keys.length - 1) {
                return current[keys[i]][valueName];
            } else {
                current = current[keys[i]];
            }
        }
    }

    deleteKey(keyPath) {
        const keys = keyPath.split('\\');
        let current = this.registry;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                throw new Error(`Key "${keys.slice(0, i + 1).join('\\')}" not found`);
            }
            current = current[keys[i]];
        }

        const lastKey = keys[keys.length - 1];
        if (!current[lastKey]) {
            throw new Error(`Key "${keyPath}" not found`);
        }

        delete current[lastKey];
        this.saveRegistry();
    }

    openKey(keyPath) {
        const keys = keyPath.split('\\');
        let current = this.registry;

        for (let i = 0; i < keys.length; i++) {
            if (!current[keys[i]]) {
                throw new Error(`Key "${keys.slice(0, i + 1).join('\\')}" not found`);
            }
            current = current[keys[i]];
        }

        return current;
    }

    closeKey(keyPath) {
        console.log(`Registry key ${keyPath} closed.`);
    }
}

module.exports = RegistryManager;
