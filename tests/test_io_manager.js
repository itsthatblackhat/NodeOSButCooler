const IOManager = require('../io/io_manager');
const ioManager = new IOManager();

function runIOManagerTests() {
    console.log("Running I/O manager tests...");
    ioManager.initialize();

    // Create a file
    const filePath = 'testfile.txt';
    const fileHandle = ioManager.createFile(filePath);

    // Write to the file
    const buffer = Buffer.from('Hello, world!', 'utf8');
    ioManager.writeFile(fileHandle, buffer, 0, buffer.length, 0);

    // Read from the file
    const readBuffer = Buffer.alloc(1024);
    const bytesRead = ioManager.readFile(fileHandle, readBuffer, 0, buffer.length, 0);
    console.log(`Read ${bytesRead} bytes: ${readBuffer.toString('utf8', 0, bytesRead)}`);

    // Close the file
    ioManager.closeFile(fileHandle);

    // Delete the file
    ioManager.deleteFile(filePath);

    // Handle I/O requests
    const newFileHandle = ioManager.handleIORequest('create', { filePath: 'testfile2.txt', options: 'w' });
    ioManager.handleIORequest('write', { handle: newFileHandle, buffer, offset: 0, length: buffer.length, position: 0 });
    const newReadBuffer = Buffer.alloc(1024);
    ioManager.handleIORequest('read', { handle: newFileHandle, buffer: newReadBuffer, offset: 0, length: buffer.length, position: 0 });
    ioManager.handleIORequest('close', { handle: newFileHandle });
    ioManager.handleIORequest('delete', { filePath: 'testfile2.txt' });

    console.log("I/O manager tests completed.");
}

runIOManagerTests();
