const Shell = require('../shell/shell');
const shell = new Shell();

function runShellTests() {
    console.log("Running shell tests...");
    shell.initialize();

    // Simulate shell commands
    shell._handleInput('createProcess 0 {} null false null null null');
    shell._handleInput('listProcesses');
    shell._handleInput('allocateMemory 1 null 0 1024 0 0');
    shell._handleInput('createFile testfile.txt w');
    shell._handleInput('writeFile 1 Hello, world! 0 13 0');
    shell._handleInput('readFile 1 13 0 13 0');
    shell._handleInput('deleteFile testfile.txt');
    shell._handleInput('terminateProcess 1');
    shell._handleInput('listProcesses');
    shell._handleInput('exit');

    console.log("Shell tests completed.");
}

runShellTests();
