const fs = require('fs');
const path = require('path');

class FileSystemManager {
    constructor(eventManager) {
        this.eventManager = eventManager;
    }

    initialize() {
        console.log("Initializing File System Manager...");
        this._setupFileSystem();
        console.log("File System Manager initialized.");
    }

    _setupFileSystem() {
        console.log("Setting up initial file system structure...");
    }

    createFile(filePath, content = '') {
        console.log(`Creating file: ${filePath}`);
        if (fs.existsSync(filePath)) {
            console.log(`File ${filePath} already exists.`);
            return;
        }
        fs.writeFileSync(filePath, content, 'utf8');
        this.eventManager.emitEvent('fileCreated', { filePath });
        console.log(`File created: ${filePath}`);
    }

    readFile(filePath) {
        console.log(`Reading file: ${filePath}`);
        if (!fs.existsSync(filePath)) {
            console.log(`File ${filePath} does not exist.`);
            return null;
        }
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`File read: ${filePath}`);
        return content;
    }

    writeFile(filePath, content) {
        console.log(`Writing to file: ${filePath}`);
        fs.writeFileSync(filePath, content, 'utf8');
        this.eventManager.emitEvent('fileWritten', { filePath });
        console.log(`File written: ${filePath}`);
    }

    deleteFile(filePath) {
        console.log(`Deleting file: ${filePath}`);
        if (!fs.existsSync(filePath)) {
            console.log(`File ${filePath} does not exist.`);
            return;
        }
        fs.unlinkSync(filePath);
        this.eventManager.emitEvent('fileDeleted', { filePath });
        console.log(`File deleted: ${filePath}`);
    }

    createDirectory(dirPath) {
        console.log(`Creating directory: ${dirPath}`);
        if (fs.existsSync(dirPath)) {
            console.log(`Directory ${dirPath} already exists.`);
            return;
        }
        fs.mkdirSync(dirPath, { recursive: true });
        this.eventManager.emitEvent('directoryCreated', { dirPath });
        console.log(`Directory created: ${dirPath}`);
    }

    deleteDirectory(dirPath) {
        console.log(`Deleting directory: ${dirPath}`);
        if (!fs.existsSync(dirPath)) {
            console.log(`Directory ${dirPath} does not exist.`);
            return;
        }
        fs.rmSync(dirPath, { recursive: true });
        this.eventManager.emitEvent('directoryDeleted', { dirPath });
        console.log(`Directory deleted: ${dirPath}`);
    }

    moveFile(sourcePath, destinationPath) {
        console.log(`Moving file from ${sourcePath} to ${destinationPath}`);
        if (!fs.existsSync(sourcePath)) {
            console.log(`File ${sourcePath} does not exist.`);
            return;
        }
        fs.renameSync(sourcePath, destinationPath);
        this.eventManager.emitEvent('fileMoved', { sourcePath, destinationPath });
        console.log(`File moved from ${sourcePath} to ${destinationPath}`);
    }

    copyFile(sourcePath, destinationPath) {
        console.log(`Copying file from ${sourcePath} to ${destinationPath}`);
        if (!fs.existsSync(sourcePath)) {
            console.log(`File ${sourcePath} does not exist.`);
            return;
        }
        fs.copyFileSync(sourcePath, destinationPath);
        this.eventManager.emitEvent('fileCopied', { sourcePath, destinationPath });
        console.log(`File copied from ${sourcePath} to ${destinationPath}`);
    }

    renameFile(oldPath, newPath) {
        console.log(`Renaming file from ${oldPath} to ${newPath}`);
        if (!fs.existsSync(oldPath)) {
            console.log(`File ${oldPath} does not exist.`);
            return;
        }
        fs.renameSync(oldPath, newPath);
        this.eventManager.emitEvent('fileRenamed', { oldPath, newPath });
        console.log(`File renamed from ${oldPath} to ${newPath}`);
    }

    listFiles(dirPath) {
        console.log(`Listing files in directory: ${dirPath}`);
        if (!fs.existsSync(dirPath)) {
            console.log(`Directory ${dirPath} does not exist.`);
            return [];
        }
        const files = fs.readdirSync(dirPath);
        console.log(`Files in directory ${dirPath}:`, files);
        return files;
    }
}

module.exports = FileSystemManager;
