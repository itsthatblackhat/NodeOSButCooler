const GraphicsManager = require('../graphics/graphics_manager');
const graphicsManager = new GraphicsManager();

function runGraphicsManagerTests() {
    console.log("Running graphics manager tests...");
    graphicsManager.initialize();

    // Create a window
    const windowId = graphicsManager.createWindow('Test Window', 800, 600, { resizable: true });
    console.log(`Window created with ID: ${windowId}`);

    // Draw graphics
    graphicsManager.drawGraphics(windowId, { description: 'Drawing some graphics...' });

    // Handle user interaction
    graphicsManager.handleUserInteraction(windowId, { type: 'click', x: 100, y: 150 });

    // Get window info
    const windowInfo = graphicsManager.getWindowInfo(windowId);
    console.log(`Window Info: ${JSON.stringify(windowInfo, null, 2)}`);

    // List windows
    const windows = graphicsManager.listWindows();
    console.log(`Windows: ${JSON.stringify(windows, null, 2)}`);

    // Close the window
    graphicsManager.closeWindow(windowId);
    console.log(`Window ${windowId} closed`);

    console.log("Graphics manager tests completed.");
}

runGraphicsManagerTests();
