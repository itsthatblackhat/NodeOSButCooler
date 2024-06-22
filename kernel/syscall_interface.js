// File: D:\JSOS\kernel\syscall_interface.js

const fs = require('fs');
const RegistryManager = require('../registry/registry_manager');

class SyscallInterface {
    constructor() {
        this.registryManager = new RegistryManager();
        this.apiMap = {
            'CreateFile': this.createFile,
            'ReadFile': this.readFile,
            'WriteFile': this.writeFile,
            'CloseHandle': this.closeHandle,
            'DeleteFile': this.deleteFile,
            'MoveFile': this.moveFile,
            'GetFileAttributes': this.getFileAttributes,
            'RegCreateKeyEx': this.regCreateKeyEx,
            'RegSetValueEx': this.regSetValueEx,
            'RegOpenKeyEx': this.regOpenKeyEx,
            'RegQueryValueEx': this.regQueryValueEx,
            'RegCloseKey': this.regCloseKey,
            'RegDeleteKey': this.regDeleteKey,
        };
    }

    handleSyscall(apiName, ...args) {
        if (this.apiMap[apiName]) {
            return this.apiMap[apiName].apply(this, args);
        } else {
            console.error(`Unsupported API call: ${apiName}`);
        }
    }

    createFile(filePath, accessMode) {
        try {
            const fd = fs.openSync(filePath, accessMode);
            console.log(`Creating file ${filePath}`);
            return fd;
        } catch (error) {
            console.error(`Error creating file ${filePath}:`, error);
            throw error;
        }
    }

    readFile(handle, buffer, numBytesToRead) {
        try {
            const bytesRead = fs.readSync(handle, buffer, 0, numBytesToRead, null);
            console.log('Reading file');
            return bytesRead;
        } catch (error) {
            console.error('Error reading file:', error);
            throw error;
        }
    }

    writeFile(handle, buffer, numBytesToWrite) {
        try {
            const bytesWritten = fs.writeSync(handle, buffer, 0, numBytesToWrite, null);
            console.log('Writing file');
            return bytesWritten;
        } catch (error) {
            console.error('Error writing file:', error);
            throw error;
        }
    }

    closeHandle(handle) {
        try {
            fs.closeSync(handle);
            console.log('Closing handle');
        } catch (error) {
            console.error('Error closing handle:', error);
            throw error;
        }
    }

    deleteFile(filePath) {
        try {
            fs.unlinkSync(filePath);
            console.log(`Deleting file ${filePath}`);
        } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error);
            throw error;
        }
    }

    moveFile(existingFilePath, newFilePath) {
        try {
            fs.renameSync(existingFilePath, newFilePath);
            console.log(`Moving file from ${existingFilePath} to ${newFilePath}`);
        } catch (error) {
            console.error(`Error moving file from ${existingFilePath} to ${newFilePath}:`, error);
            throw error;
        }
    }

    getFileAttributes(filePath) {
        try {
            const stats = fs.statSync(filePath);
            console.log(`Getting file attributes for ${filePath}`);
            return {
                fileName: filePath,
                size: stats.size,
                creationTime: stats.birthtime,
                lastAccessTime: stats.atime,
                lastWriteTime: stats.mtime,
                attributes: stats.mode
            };
        } catch (error) {
            console.error(`Error getting file attributes for ${filePath}:`, error);
            throw error;
        }
    }

    regCreateKeyEx(hKey, subKey) {
        try {
            this.registryManager.createKey(`${hKey}\\${subKey}`);
            console.log(`Registry key ${hKey}\\${subKey} created.`);
        } catch (error) {
            console.error(`Error creating registry key ${hKey}\\${subKey}:`, error);
            throw error;
        }
    }

    regSetValueEx(hKey, lpValueName, lpData) {
        try {
            this.registryManager.setValue(hKey, lpValueName, lpData);
            console.log(`Registry value ${lpValueName} set for key ${hKey}.`);
        } catch (error) {
            console.error(`Error setting registry value ${lpValueName} for key ${hKey}:`, error);
            throw error;
        }
    }

    regOpenKeyEx(hKey, subKey) {
        try {
            this.registryManager.openKey(`${hKey}\\${subKey}`);
            console.log(`Registry key ${hKey}\\${subKey} opened.`);
        } catch (error) {
            console.error(`Error opening registry key ${hKey}\\${subKey}:`, error);
            throw error;
        }
    }

    regQueryValueEx(hKey, lpValueName) {
        try {
            const value = this.registryManager.getValue(`${hKey}\\${lpValueName}`);
            console.log(`Registry value ${lpValueName} queried in key ${hKey}.`);
            return value;
        } catch (error) {
            console.error(`Error querying registry value ${lpValueName} in key ${hKey}:`, error);
            throw error;
        }
    }

    regCloseKey(hKey) {
        try {
            this.registryManager.closeKey(hKey);
            console.log(`Registry key ${hKey} closed.`);
        } catch (error) {
            console.error(`Error closing registry key ${hKey}:`, error);
            throw error;
        }
    }

    regDeleteKey(hKey, subKey) {
        try {
            this.registryManager.deleteKey(`${hKey}\\${subKey}`);
            console.log(`Registry key ${hKey}\\${subKey} deleted.`);
        } catch (error) {
            console.error(`Error deleting registry key ${hKey}\\${subKey}:`, error);
            throw error;
        }
    }
}

module.exports = new SyscallInterface();
