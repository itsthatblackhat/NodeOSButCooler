const IOManager = require('../io/io_manager');

const ioManager = new IOManager();

function runIOManagerTests() {
    console.log("Running I/O manager tests...");
    ioManager.initialize();

    // Create a file
    const fileHandle = ioManager.createFile('testfile.txt', 'w');

    // Write to the file
    const buffer = Buffer.from('Hello, world!');
    ioManager.writeFile(fileHandle, buffer, 0, buffer.length, 0);

    // Close the file
    ioManager.closeFile(fileHandle);

    // Reopen the file for reading
    const readFileHandle = ioManager.createFile('testfile.txt', 'r');

    // Read from the file
    const readBuffer = Buffer.alloc(1024);
    ioManager.readFile(readFileHandle, readBuffer, 0, buffer.length, 0);

    // Close the file after reading
    ioManager.closeFile(readFileHandle);

    console.log("I/O manager tests completed.");
}

runIOManagerTests();
