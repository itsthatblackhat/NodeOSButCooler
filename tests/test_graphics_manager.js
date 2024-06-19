const GraphicsManager = require('../graphics/graphics_manager');
const graphicsManager = new GraphicsManager();

function runGraphicsManagerTests() {
    console.log("Running graphics manager tests...");
    graphicsManager.initialize();

    // Create a window
    const windowId = graphicsManager.createWindow('Test Window', 800, 600, { resizable: true });

    // Get window info
    const windowInfo = graphicsManager.getWindowInfo(windowId);
    console.log(`Window Info:`, windowInfo);

    // Draw graphics in the window
    graphicsManager.drawGraphics(windowId, { color: 'red', x: 100, y: 100, width: 200, height: 200 });

    // Handle user interaction
    graphicsManager.handleUserInteraction(windowId, { type: 'click' });

    // List all windows
    const windows = graphicsManager.listWindows();
    console.log("Windows:", windows);

    // Close the window
    graphicsManager.closeWindow(windowId);

    console.log("Graphics manager tests completed.");
}

runGraphicsManagerTests();
