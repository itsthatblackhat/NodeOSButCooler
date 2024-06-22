const Win32Subsystem = require('../subsys/win32_subsystem');

function runWin32SubsystemTests() {
    const win32Subsystem = new Win32Subsystem();
    win32Subsystem.initialize();

    const processId = 1;
    const processInfo = { priority: 'normal' };
    win32Subsystem.createProcess(processId, processInfo);

    console.log('Process Info:', win32Subsystem.getProcessInfo(processId));

    win32Subsystem.sendMessage(processId, { pid: processId, message: 'Hello, Win32 Process!' });

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
        fileHandle = win32Subsystem.handleApiCall('CreateFile', [filePath, 'w']);
        win32Subsystem.handleApiCall('WriteFile', [fileHandle, writeBuffer, 0, writeBuffer.length, null]);
        win32Subsystem.handleApiCall('CloseHandle', [fileHandle]);

        fileHandle = win32Subsystem.handleApiCall('CreateFile', [filePath, 'r']);
        const readBuffer = Buffer.alloc(writeBuffer.length);
        win32Subsystem.handleApiCall('ReadFile', [fileHandle, readBuffer, 0, writeBuffer.length, null]);
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
        cleanupRegistryKey('HKEY_LOCAL_MACHINE', 'Software\\Test');

        win32Subsystem.handleApiCall('RegCreateKeyEx', ['HKEY_LOCAL_MACHINE', 'Software\\Test']);
        console.log('Registry key created.');

        win32Subsystem.handleApiCall('RegSetValueEx', ['HKEY_LOCAL_MACHINE\\Software\\Test', 'TestValue', 'TestData']);
        console.log('Registry value set.');

        const value = win32Subsystem.handleApiCall('RegQueryValueEx', ['HKEY_LOCAL_MACHINE\\Software\\Test', 'TestValue']);
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
