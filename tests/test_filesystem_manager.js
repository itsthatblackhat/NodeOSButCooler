const FileSystemManager = require('../filesys/filesystem_manager');
const fileSystemManager = new FileSystemManager();
const testDir = path.join(__dirname, 'test_dir');
const testFile = path.join(testDir, 'test_file.txt');

function runFileSystemManagerTests() {
    console.log("Running file system manager tests...");
    fileSystemManager.initialize();

    // Create a directory
    fileSystemManager.createDirectory(testDir);

    // Create a file
    fileSystemManager.createFile(testFile, 'Hello, world!');

    // Read the file
    const content = fileSystemManager.readFile(testFile);
    console.log(`Content of ${testFile}: ${content}`);

    // Write to the file
    fileSystemManager.writeFile(testFile, 'Updated content');
    const updatedContent = fileSystemManager.readFile(testFile);
    console.log(`Updated content of ${testFile}: ${updatedContent}`);

    // List files in directory
    const files = fileSystemManager.listFiles(testDir);
    console.log(`Files in ${testDir}:`, files);

    // Delete the file
    fileSystemManager.deleteFile(testFile);
    console.log(`Deleted ${testFile}`);

    // Delete the directory
    fileSystemManager.deleteDirectory(testDir);
    console.log(`Deleted ${testDir}`);

    console.log("File system manager tests completed.");
}

runFileSystemManagerTests();
