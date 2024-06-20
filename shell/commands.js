const fs = require('fs');
const path = require('path');

function dirCommand() {
    const files = fs.readdirSync('.');
    files.forEach(file => {
        const stats = fs.statSync(file);
        if (stats.isFile()) {
            console.log(`FILE ${file}`);
        } else if (stats.isDirectory()) {
            console.log(`DIR  ${file}`);
        }
    });
}

function mkdirCommand(args) {
    const [dirName] = args;
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
        console.log(`Directory created: ${dirName}`);
    } else {
        console.log(`Directory ${dirName} already exists.`);
    }
}

function copyCommand(args) {
    const [source, destination] = args;
    if (fs.existsSync(source)) {
        fs.copyFileSync(source, destination);
        console.log(`Copied ${source} to ${destination}`);
    } else {
        console.log(`Source file ${source} does not exist.`);
    }
}

function delCommand(args) {
    const [fileName] = args;
    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        console.log(`Deleted ${fileName}`);
    } else {
        console.log(`File ${fileName} does not exist.`);
    }
}

function rmdirCommand(args) {
    const [dirName] = args;
    if (fs.existsSync(dirName)) {
        fs.rmdirSync(dirName, { recursive: true });
        console.log(`Directory removed: ${dirName}`);
    } else {
        console.log(`Directory ${dirName} does not exist.`);
    }
}

function clsCommand() {
    process.stdout.write('\x1Bc');
}

function pauseCommand(callback) {
    console.log('Press any key to continue...');
    process.stdin.setRawMode(true);
    process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        callback();
    });
}

module.exports = {
    dirCommand,
    mkdirCommand,
    copyCommand,
    delCommand,
    rmdirCommand,
    clsCommand,
    pauseCommand
};
