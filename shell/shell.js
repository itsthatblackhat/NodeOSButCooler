const readline = require('readline');
const Kernel = require('../kernel/kernel.js');
const commands = require('./commands');
const fs = require('fs');
const path = require('path');

class Shell {
    constructor(fileSystemManager) {
        this.kernel = new Kernel(fileSystemManager);
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'JSOS> '
        });
        this.currentDir = process.cwd();
        this.commandQueue = [];
        this.processingCommand = false;

        // Bind the method to the instance
        this._handleInput = this._handleInput.bind(this);
    }

    initialize() {
        console.log("Initializing Shell...");
        this.kernel.initialize();
        this._setupShell();
        console.log("Shell initialized.");
    }

    _setupShell() {
        this.rl.prompt();

        this.rl.on('line', (line) => {
            const input = line.trim();
            this._handleInput(input);
            this.rl.prompt();
        });

        this.rl.on('close', () => {
            console.log('Shell closed.');
            process.exit(0);
        });
    }

    _handleInput(input) {
        const [command, ...args] = input.split(' ');
        switch (command.toLowerCase()) {
            case 'exit':
                this.rl.close();
                break;
            case 'createprocess':
                this._createProcess(args);
                break;
            case 'terminateprocess':
                this._terminateProcess(args);
                break;
            case 'allocatememory':
                this._allocateMemory(args);
                break;
            case 'freememory':
                this._freeMemory(args);
                break;
            case 'createfile':
                this._createFile(args);
                break;
            case 'readfile':
                this._readFile(args);
                break;
            case 'writefile':
                this._writeFile(args);
                break;
            case 'deletefile':
                this._deleteFile(args);
                break;
            case 'listprocesses':
                this._listProcesses();
                break;
            case 'dir':
                this._dir(args);
                break;
            case 'mkdir':
                commands.mkdirCommand(args);
                break;
            case 'copy':
                commands.copyCommand(args);
                break;
            case 'del':
                commands.delCommand(args);
                break;
            case 'rmdir':
                commands.rmdirCommand(args);
                break;
            case 'cls':
                commands.clsCommand();
                break;
            case 'pause':
                commands.pauseCommand(() => this.rl.prompt());
                break;
            case 'echo':
                this._echo(args);
                break;
            case 'cd':
                this._cd(args);
                break;
            default:
                console.log(`Unknown command: ${command}`);
                break;
        }
    }

    _createProcess(args) {
        const [desiredAccess, objectAttributes, parentProcessId, inheritObjectTable, sectionHandle, debugPort, exceptionPort] = args;
        const processId = this.kernel.handleSystemCall('createProcess', [desiredAccess, objectAttributes, parentProcessId, inheritObjectTable, sectionHandle, debugPort, exceptionPort]);
        console.log(`Process created with ID ${processId}`);
    }

    _terminateProcess(args) {
        const [processId] = args;
        this.kernel.handleSystemCall('terminateProcess', [processId]);
        console.log(`Process ${processId} terminated`);
    }

    _allocateMemory(args) {
        const [processId, baseAddress, zeroBits, allocationSize, allocationType, protect] = args;
        const memoryAddress = this.kernel.handleSystemCall('allocateMemory', [processId, baseAddress, zeroBits, allocationSize, allocationType, protect]);
        console.log(`Memory allocated at address ${memoryAddress} for process ${processId}`);
    }

    _freeMemory(args) {
        const [processId, baseAddress, regionSize, freeType] = args;
        this.kernel.handleSystemCall('freeMemory', [processId, baseAddress, regionSize, freeType]);
        console.log(`Memory at address ${baseAddress} for process ${processId} freed`);
    }

    _createFile(args) {
        const [filePath, options] = args;
        const fileHandle = this.kernel.handleSystemCall('createFile', [filePath, options]);
        console.log(`File created with handle ${fileHandle}`);
    }

    _readFile(args) {
        const [fileHandle, buffer, offset, length, position] = args;
        const bytesRead = this.kernel.handleSystemCall('readFile', [fileHandle, Buffer.alloc(parseInt(buffer)), parseInt(offset), parseInt(length), parseInt(position)]);
        console.log(`Read ${bytesRead} bytes from file with handle ${fileHandle}`);
    }

    _writeFile(args) {
        const [fileHandle, data, offset, length, position] = args;
        const buffer = Buffer.from(data);
        const bytesWritten = this.kernel.handleSystemCall('writeFile', [fileHandle, buffer, parseInt(offset), parseInt(length), parseInt(position)]);
        console.log(`Wrote ${bytesWritten} bytes to file with handle ${fileHandle}`);
    }

    _deleteFile(args) {
        const [filePath] = args;
        this.kernel.handleSystemCall('deleteFile', [filePath]);
        console.log(`File ${filePath} deleted`);
    }

    _listProcesses() {
        const processes = this.kernel.processManager.processTable;
        console.log("List of processes:");
        for (const [processId, processInfo] of processes.entries()) {
            console.log(`Process ID: ${processId}, Info: ${JSON.stringify(processInfo)}`);
        }
    }

    _dir(args) {
        const directoryPath = args[0] || '.';
        const files = fs.readdirSync(directoryPath);
        files.forEach(file => {
            const stats = fs.statSync(file);
            if (stats.isFile()) {
                console.log(`FILE ${file}`);
            } else if (stats.isDirectory()) {
                console.log(`DIR  ${file}`);
            }
        });
    }

    _echo(args) {
        console.log(args.join(' '));
    }

    _cd(args) {
        const [dirPath] = args;
        if (!dirPath) {
            console.log(process.cwd());
            return;
        }
        try {
            process.chdir(dirPath);
            console.log(`New directory: ${process.cwd()}`);
        } catch (err) {
            console.log(`chdir: ${err.message}`);
        }
    }
}

module.exports = Shell;
