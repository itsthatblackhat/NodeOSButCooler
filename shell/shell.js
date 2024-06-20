// shell.js
const readline = require('readline');
const Kernel = require('../kernel/kernel.js');
const fs = require('fs');

class Shell {
    constructor() {
        this.kernel = new Kernel();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'JSOS> '
        });
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
                this._mkdir(args);
                break;
            case 'copy':
                this._copy(args);
                break;
            case 'del':
                this._del(args);
                break;
            case 'rmdir':
                this._rmdir(args);
                break;
            case 'cls':
                this._cls();
                break;
            case 'pause':
                this._pause();
                break;
            case 'type':
                this._type(args);
                break;
            case 'rename':
                this._rename(args);
                break;
            case 'move':
                this._move(args);
                break;
            case 'attrib':
                this._attrib(args);
                break;
            case 'xcopy':
                this._xcopy(args);
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
        const [filePath, content] = args;
        this.kernel.fileSystemManager.createFile(filePath, content);
    }

    _readFile(args) {
        const [filePath] = args;
        const content = this.kernel.fileSystemManager.readFile(filePath);
        console.log(content);
    }

    _writeFile(args) {
        const [filePath, content] = args;
        this.kernel.fileSystemManager.writeFile(filePath, content);
    }

    _deleteFile(args) {
        const [filePath] = args;
        this.kernel.fileSystemManager.deleteFile(filePath);
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
        const files = this.kernel.fileSystemManager.listFiles(directoryPath);
        files.forEach(file => {
            console.log(`FILE ${file}`);
        });
    }

    _mkdir(args) {
        const [dirPath] = args;
        if (!dirPath) {
            console.log('Usage: mkdir <directory>');
            return;
        }

        if (fs.existsSync(dirPath)) {
            console.log(`Directory ${dirPath} already exists.`);
        } else {
            this.kernel.fileSystemManager.createDirectory(dirPath);
        }
    }

    _copy(args) {
        const [src, dest] = args;
        if (!src || !dest) {
            console.log('Usage: copy <source> <destination>');
            return;
        }
        fs.copyFile(src, dest, (err) => {
            if (err) {
                console.error(`Error copying file from ${src} to ${dest}:`, err);
            } else {
                console.log(`Copied ${src} to ${dest}`);
            }
        });
    }

    _del(args) {
        const filePath = args[0];
        if (!filePath) {
            console.log('Usage: del <file>');
            return;
        }
        this.kernel.fileSystemManager.deleteFile(filePath);
    }

    _rmdir(args) {
        const directoryPath = args[0];
        if (!directoryPath) {
            console.log('Usage: rmdir <directory>');
            return;
        }

        if (!fs.existsSync(directoryPath)) {
            console.log(`Directory ${directoryPath} does not exist.`);
        } else {
            this.kernel.fileSystemManager.deleteDirectory(directoryPath);
        }
    }

    _cls() {
        process.stdout.write('\u001b[2J\u001b[0;0H');
    }

    _pause() {
        console.log('Press any key to continue...');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', () => {
            process.stdin.setRawMode(false);
            process.stdin.pause();
            this.rl.prompt();
        });
    }

    _type(args) {
        const filePath = args[0];
        if (!filePath) {
            console.log('Usage: type <file>');
            return;
        }
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${filePath}:`, err);
            } else {
                console.log(data);
            }
        });
    }

    _rename(args) {
        const [oldPath, newPath] = args;
        if (!oldPath || !newPath) {
            console.log('Usage: rename <oldName> <newName>');
            return;
        }
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(`Error renaming ${oldPath} to ${newPath}:`, err);
            } else {
                console.log(`Renamed ${oldPath} to ${newPath}`);
            }
        });
    }

    _move(args) {
        this._copy(args);
        this._del([args[0]]);
    }

    _attrib(args) {
        const filePath = args[0];
        if (!filePath) {
            console.log('Usage: attrib <file>');
            return;
        }
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error(`Error getting attributes for ${filePath}:`, err);
            } else {
                console.log(`Attributes of ${filePath}:`);
                console.log(`  Size: ${stats.size} bytes`);
                console.log(`  Created: ${stats.birthtime}`);
                console.log(`  Modified: ${stats.mtime}`);
                console.log(`  Accessed: ${stats.atime}`);
            }
        });
    }

    _xcopy(args) {
        const [src, dest] = args;
        if (!src || !dest) {
            console.log('Usage: xcopy <source> <destination>');
            return;
        }
        const copyRecursive = (src, dest) => {
            fs.stat(src, (err, stats) => {
                if (err) {
                    console.error(`Error getting stats for ${src}:`, err);
                    return;
                }
                if (stats.isDirectory()) {
                    fs.mkdir(dest, { recursive: true }, (err) => {
                        if (err) {
                            console.error(`Error creating directory ${dest}:`, err);
                            return;
                        }
                        fs.readdir(src, (err, files) => {
                            if (err) {
                                console.error(`Error reading directory ${src}:`, err);
                                return;
                            }
                            files.forEach(file => {
                                copyRecursive(path.join(src, file), path.join(dest, file));
                            });
                        });
                    });
                } else {
                    fs.copyFile(src, dest, (err) => {
                        if (err) {
                            console.error(`Error copying file from ${src} to ${dest}:`, err);
                        } else {
                            console.log(`Copied ${src} to ${dest}`);
                        }
                    });
                }
            });
        };
        copyRecursive(src, dest);
    }
}

module.exports = Shell;
