const fs = require('fs');
const path = require('path');

class FileSystemManager {
    constructor() {}

    initialize() {
        console.log("Initializing File System Manager...");
        this._setupFileSystem();
        console.log("File System Manager initialized.");
    }

    _setupFileSystem() {
        console.log("Setting up initial file system structure...");
        // Simulate setting up initial file system structure
    }

    createFile(filePath, content = '') {
        console.log(`Creating file: ${filePath}`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`File created: ${filePath}`);
    }

    readFile(filePath) {
        console.log(`Reading file: ${filePath}`);
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`File read: ${filePath}`);
        return content;
    }

    writeFile(filePath, content) {
        console.log(`Writing to file: ${filePath}`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`File written: ${filePath}`);
    }

    deleteFile(filePath) {
        console.log(`Deleting file: ${filePath}`);
        fs.unlinkSync(filePath);
        console.log(`File deleted: ${filePath}`);
    }

    createDirectory(dirPath) {
        console.log(`Creating directory: ${dirPath}`);
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    }

    deleteDirectory(dirPath) {
        console.log(`Deleting directory: ${dirPath}`);
        fs.rmdirSync(dirPath, { recursive: true });
        console.log(`Directory deleted: ${dirPath}`);
    }

    listFiles(dirPath) {
        console.log(`Listing files in directory: ${dirPath}`);
        const files = fs.readdirSync(dirPath);
        console.log(`Files in directory ${dirPath}:`, files);
        return files;
    }
}

module.exports = FileSystemManager;
