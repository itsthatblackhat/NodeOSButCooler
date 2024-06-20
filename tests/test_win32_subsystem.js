// test_win32_subsystem.js
const Win32Subsystem = require('../subsys/win32_subsystem');

function runWin32SubsystemTests() {
    const win32Subsystem = new Win32Subsystem();
    win32Subsystem.initialize();

    const processId = 1;
    const processInfo = { name: 'Win32 Process', priority: 'normal' };
    win32Subsystem.createProcess(processId, processInfo);

    console.log('Process Info:', win32Subsystem.getProcessInfo(processId));

    win32Subsystem.sendMessage(processId, 'Hello, Win32 Process!');

    const filePath = 'D:\\jsos\\tests\\test.txt';
    const newFilePath = 'D:\\jsos\\tests\\new_test.txt';
    const writeBuffer = Buffer.from('Hello, Win32!');

    let fileHandle;

    // Stage: Setup initial state
    function cleanupFile(path) {
        try {
            win32Subsystem.handleApiCall('DeleteFile', [path]);
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.log(`File not found: ${path}, cannot delete.`);
            } else {
                console.error(`Error deleting file ${path}:`, e);
            }
        }
    }

    function cleanupRegistryKey(hKey, subKey) {
        try {
            win32Subsystem.handleApiCall('RegDeleteKey', [hKey, subKey]);
        } catch (e) {
            if (e.message.includes('not found')) {
                console.log(`Registry key not found: ${hKey}\\${subKey}, cannot delete.`);
            } else {
                console.error(`Error deleting registry key ${hKey}\\${subKey}:`, e);
            }
        }
    }

    cleanupFile(filePath);
    cleanupFile(newFilePath);
    cleanupRegistryKey('HKEY_LOCAL_MACHINE', 'Software\\Test');

    // Test file operations
    try {
        fileHandle = win32Subsystem.handleApiCall('CreateFile', [filePath, 'w', 'rw', null, 'open', 'normal', null]);
        win32Subsystem.handleApiCall('WriteFile', [fileHandle, writeBuffer, writeBuffer.length, null, null]);
        win32Subsystem.handleApiCall('CloseHandle', [fileHandle]);

        fileHandle = win32Subsystem.handleApiCall('CreateFile', [filePath, 'r', 'rw', null, 'open', 'normal', null]);
        const readBuffer = Buffer.alloc(writeBuffer.length);
        win32Subsystem.handleApiCall('ReadFile', [fileHandle, readBuffer, readBuffer.length, null, null]);
        console.log('Read result:', readBuffer.toString('utf8', 0, writeBuffer.length));
        win32Subsystem.handleApiCall('CloseHandle', [fileHandle]);

        win32Subsystem.handleApiCall('MoveFile', [filePath, newFilePath]);
        console.log('Move result: Moved file from', filePath, 'to', newFilePath);

        const fileAttributes = win32Subsystem.handleApiCall('GetFileAttributes', [newFilePath]);
        console.log('File Attributes:', fileAttributes);

        win32Subsystem.handleApiCall('DeleteFile', [newFilePath]);
        console.log('Delete result: Deleted file', newFilePath);
    } catch (error) {
        console.error('Error during file operations:', error);
    }

    // Test registry operations
    try {
        // First ensure the key doesn't exist
        cleanupRegistryKey('HKEY_LOCAL_MACHINE', 'Software\\Test');

        // Create, modify, query, and delete registry key
        win32Subsystem.handleApiCall('RegCreateKeyEx', ['HKEY_LOCAL_MACHINE', 'Software\\Test', 0, null, 0, 'KEY_WRITE', null, null]);
        console.log('Registry key created.');

        win32Subsystem.handleApiCall('RegSetValueEx', ['HKEY_LOCAL_MACHINE\\Software\\Test', 'TestValue', 0, 'REG_SZ', 'TestData', 'TestData'.length]);
        console.log('Registry value set.');

        const value = win32Subsystem.handleApiCall('RegQueryValueEx', ['HKEY_LOCAL_MACHINE\\Software\\Test', 'TestValue', null, null, null, null]);
        console.log('Registry Value:', value);

        win32Subsystem.handleApiCall('RegCloseKey', ['HKEY_LOCAL_MACHINE\\Software\\Test']);
        console.log('Registry key closed.');

        win32Subsystem.handleApiCall('RegDeleteKey', ['HKEY_LOCAL_MACHINE', 'Software\\Test']);
        console.log('Registry key deleted.');
    } catch (error) {
        console.error('Error during registry operations:', error);
    }

    win32Subsystem.terminateProcess(processId);
    console.log('Process', processId, 'terminated.');
}

runWin32SubsystemTests();
