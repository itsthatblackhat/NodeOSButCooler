const fs = require('fs');

class IOManager {
    constructor() {
        this.fileHandles = new Map();
        this.nextFileHandle = 1;
    }

    initialize() {
        console.log("Initializing I/O Manager...");
        this._setupFileSystem();
        console.log("I/O Manager initialized.");
    }

    _setupFileSystem() {
        console.log("Setting up file system...");
    }

    createFile(filePath, options = 'w') {
        console.log(`Creating file: ${filePath}`);
        try {
            const fd = fs.openSync(filePath, options);
            const fileHandle = this.nextFileHandle++;
            this.fileHandles.set(fileHandle, { filePath, fd });
            console.log(`File created: ${filePath} with handle ${fileHandle}`);
            return fileHandle;
        } catch (error) {
            console.error(`Error creating file ${filePath}:`, error);
            throw error;
        }
    }

    readFile(fileHandle, buffer, offset, length, position) {
        console.log(`Reading file with handle: ${fileHandle}`);
        try {
            const file = this.fileHandles.get(fileHandle);
            if (!file) {
                throw new Error(`Invalid file handle: ${fileHandle}`);
            }
            const bytesRead = fs.readSync(file.fd, buffer, offset, length, position);
            console.log(`Read ${bytesRead} bytes from file ${file.filePath}`);
            return bytesRead;
        } catch (error) {
            console.error(`Error reading file with handle ${fileHandle}:`, error);
            throw error;
        }
    }

    writeFile(fileHandle, buffer, offset, length, position) {
        console.log(`Writing to file with handle: ${fileHandle}`);
        try {
            const file = this.fileHandles.get(fileHandle);
            if (!file) {
                throw new Error(`Invalid file handle: ${fileHandle}`);
            }
            const bytesWritten = fs.writeSync(file.fd, buffer, offset, length, position);
            console.log(`Wrote ${bytesWritten} bytes to file ${file.filePath}`);
            return bytesWritten;
        } catch (error) {
            console.error(`Error writing to file with handle ${fileHandle}:`, error);
            throw error;
        }
    }

    deleteFile(filePath) {
        console.log(`Deleting file: ${filePath}`);
        try {
            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filePath}`);
        } catch (error) {
            console.error(`Error deleting file ${filePath}:`, error);
            throw error;
        }
    }

    closeFile(fileHandle) {
        console.log(`Closing file with handle: ${fileHandle}`);
        try {
            const file = this.fileHandles.get(fileHandle);
            if (!file) {
                throw new Error(`Invalid file handle: ${fileHandle}`);
            }
            fs.closeSync(file.fd);
            this.fileHandles.delete(fileHandle);
            console.log(`File with handle ${fileHandle} closed`);
        } catch (error) {
            console.error(`Error closing file with handle ${fileHandle}:`, error);
            throw error;
        }
    }
}

module.exports = IOManager;
