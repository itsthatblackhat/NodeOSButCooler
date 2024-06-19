const UIManager = require('../ui/ui_manager.js');
const uiManager = new UIManager();

function runUIManagerTests() {
    console.log("Running UI manager tests...");
    uiManager.initialize();

    // Create a window
    const windowId = uiManager.createWindow('Test Window', 800, 600, { resizable: true });

    // Get window info
    const windowInfo = uiManager.getWindowInfo(windowId);
    console.log(`Window Info:`, windowInfo);

    // Draw graphics in the window
    uiManager.drawGraphics(windowId, 'Drawing some graphics...');

    // Handle user interaction
    uiManager.handleUserInteraction(windowId, 'User clicked a button');

    // List all windows
    const windows = uiManager.listWindows();
    console.log("Windows:", windows);

    // Close the window
    uiManager.closeWindow(windowId);

    // Test event listeners
    uiManager.on('graphicsDrawn', (id, graphics) => {
        console.log(`Graphics drawn in window ${id}: ${graphics}`);
    });

    uiManager.on('userInteraction', (id, event) => {
        console.log(`User interaction in window ${id}: ${event}`);
    });

    // Test event handling
    const newWindowId = uiManager.createWindow('Another Test Window', 1024, 768, { resizable: false });
    uiManager.drawGraphics(newWindowId, 'Drawing more graphics...');
    uiManager.handleUserInteraction(newWindowId, 'User moved a slider');

    console.log("UI manager tests completed.");
}

runUIManagerTests();
