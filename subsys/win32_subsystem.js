const fs = require('fs');
const ProcessManager = require('../kernel/process_manager');
const RegistryManager = require('../registry/registry_manager');

class Win32Subsystem {
    constructor() {
        this.processManager = new ProcessManager();
        this.registryManager = new RegistryManager();
    }

    initialize() {
        console.log("Initializing Win32 Subsystem...");
        this.processManager.initialize();
        this.registryManager.initialize();
        this._setupWin32();
        console.log("Win32 Subsystem initialized.");
    }

    _setupWin32() {
        console.log("Setting up Win32 components...");
        // Simulate setting up Win32 components
    }

    createProcess(pid, processInfo) {
        return this.processManager.createProcess(pid, processInfo.priority);
    }

    terminateProcess(pid) {
        return this.processManager.terminateProcess(pid);
    }

    getProcessInfo(pid) {
        return this.processManager.listProcesses().find(p => p.pid === pid);
    }

    sendMessage(pid, message) {
        this.processManager.sendMessage(pid, message);
    }

    handleApiCall(apiName, args) {
        switch (apiName) {
            case 'CreateFile':
                return this._createFile(...args);
            case 'ReadFile':
                return this._readFile(...args);
            case 'WriteFile':
                return this._writeFile(...args);
            case 'CloseHandle':
                return this._closeHandle(...args);
            case 'DeleteFile':
                return this._deleteFile(...args);
            case 'MoveFile':
                return this._moveFile(...args);
            case 'GetFileAttributes':
                return this._getFileAttributes(...args);
            case 'CopyFile':
                return this._copyFile(...args);
            case 'MoveFileEx':
                return this._moveFileEx(...args);
            case 'RegCreateKeyEx':
                return this._regCreateKeyEx(...args);
            case 'RegSetValueEx':
                return this._regSetValueEx(...args);
            case 'RegOpenKeyEx':
                return this._regOpenKeyEx(...args);
            case 'RegQueryValueEx':
                return this._regQueryValueEx(...args);
            case 'RegCloseKey':
                return this._regCloseKey(...args);
            case 'RegDeleteKey':
                return this._regDeleteKey(...args);
            default:
                throw new Error(`Unknown API call: ${apiName}`);
        }
    }

    _createFile(filePath, accessMode, shareMode, securityAttributes, creationDisposition, flagsAndAttributes, templateFile) {
        try {
            const fd = fs.openSync(filePath, accessMode);
            console.log(`Creating file ${filePath}`);
            return fd;
        } catch (error) {
            console.error(`Error creating file ${filePath}:`, error);
            throw error;
        }
    }

    _readFile(handle, buffer, numBytesToRead, numBytesRead, overlapped) {
        try {
            const bytesRead = fs.readSync(handle, buffer, 0, numBytesToRead, null);
            console.log('Reading file');
            return bytesRead;
        } catch (error) {
            console.error('Error reading file:', error);
            throw error;
        }
    }

    _writeFile(handle, buffer, numBytesToWrite, numBytesWritten, overlapped) {
        try {
            const bytesWritten = fs.writeSync(handle, buffer, 0, numBytesToWrite, null);
            console.log('Writing file');
            return bytesWritten;
        } catch (error) {
            console.error('Error writing file:', error);
            throw error;
        }
    }

    _closeHandle(handle) {
        try {
            fs.closeSync(handle);
            console.log('Closing handle');
        } catch (error) {
            console.error('Error closing handle:', error);
            throw error;
        }
    }

    _deleteFile(filePath) {
        try {
            fs.unlinkSync(filePath);
            console.log(`Deleting file ${filePath}`);
        } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error);
            throw error;
        }
    }

    _moveFile(existingFilePath, newFilePath) {
        try {
            fs.renameSync(existingFilePath, newFilePath);
            console.log(`Moving file from ${existingFilePath} to ${newFilePath}`);
        } catch (error) {
            console.error(`Error moving file from ${existingFilePath} to ${newFilePath}:`, error);
            throw error;
        }
    }

    _getFileAttributes(filePath) {
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

    _copyFile(srcFilePath, destFilePath, failIfExists) {
        try {
            if (failIfExists && fs.existsSync(destFilePath)) {
                throw new Error(`Destination file ${destFilePath} already exists`);
            }
            fs.copyFileSync(srcFilePath, destFilePath);
            console.log(`Copied file from ${srcFilePath} to ${destFilePath}`);
        } catch (error) {
            console.error(`Error copying file from ${srcFilePath} to ${destFilePath}:`, error);
            throw error;
        }
    }

    _moveFileEx(existingFilePath, newFilePath, flags) {
        try {
            if (flags & MOVEFILE_REPLACE_EXISTING) {
                fs.renameSync(existingFilePath, newFilePath);
                console.log(`Moved file from ${existingFilePath} to ${newFilePath} with replace existing flag`);
            } else {
                if (fs.existsSync(newFilePath)) {
                    throw new Error(`Destination file ${newFilePath} already exists`);
                }
                fs.renameSync(existingFilePath, newFilePath);
                console.log(`Moved file from ${existingFilePath} to ${newFilePath}`);
            }
        } catch (error) {
            console.error(`Error moving file from ${existingFilePath} to ${newFilePath}:`, error);
            throw error;
        }
    }

    _regCreateKeyEx(hKey, subKey, reserved, lpClass, dwOptions, samDesired, lpSecurityAttributes, phkResult, lpdwDisposition) {
        try {
            if (!this.registryManager.getValue(hKey, subKey)) {
                this.registryManager.createKey(hKey + '\\' + subKey);
                console.log(`Key "${hKey}\\${subKey}" created.`);
            } else {
                console.log(`Key "${hKey}\\${subKey}" already exists.`);
            }
        } catch (error) {
            console.error(`Error creating registry key ${hKey}\\${subKey}:`, error);
            throw error;
        }
    }

    _regSetValueEx(hKey, lpValueName, reserved, dwType, lpData, cbData) {
        try {
            this.registryManager.setValue(hKey, lpValueName, lpData);
            console.log(`Value "${lpValueName}" set for key "${hKey}".`);
        } catch (error) {
            console.error(`Error setting registry value ${lpValueName} for key ${hKey}:`, error);
            throw error;
        }
    }

    _regOpenKeyEx(hKey, subKey, ulOptions, samDesired, phkResult) {
        try {
            this.registryManager.openKey(hKey, subKey);
            console.log(`Registry key ${hKey}\\${subKey} opened.`);
        } catch (error) {
            console.error(`Error opening registry key ${hKey}\\${subKey}:`, error);
            throw error;
        }
    }

    _regQueryValueEx(hKey, lpValueName, lpReserved, lpType, lpData, lpcbData) {
        try {
            const value = this.registryManager.getValue(hKey, lpValueName);
            console.log(`Registry value ${lpValueName} queried in key ${hKey}.`);
            return value;
        } catch (error) {
            console.error(`Error querying registry value ${lpValueName} in key ${hKey}:`, error);
            throw error;
        }
    }

    _regCloseKey(hKey) {
        try {
            console.log(`Registry key ${hKey} closed.`);
        } catch (error) {
            console.error(`Error closing registry key ${hKey}:`, error);
            throw error;
        }
    }

    _regDeleteKey(hKey, subKey) {
        try {
            this.registryManager.deleteKey(`${hKey}\\${subKey}`);
            console.log(`Key "${hKey}\\${subKey}" deleted.`);
        } catch (error) {
            console.error(`Error deleting registry key ${hKey}\\${subKey}:`, error);
            throw error;
        }
    }
}

module.exports = Win32Subsystem;
