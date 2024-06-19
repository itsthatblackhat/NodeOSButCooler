const NetworkManager = require('../network/network_manager.js');
const networkManager = new NetworkManager();

function runNetworkManagerTests() {
    console.log("Running network manager tests...");
    networkManager.initialize();

    // List network interfaces
    const interfaces = networkManager.listInterfaces();
    console.log("Network interfaces:", interfaces);

    // Get interface info
    const interfaceInfo = networkManager.getInterfaceInfo(interfaces[0]);
    console.log(`Interface info for ${interfaces[0]}:`, interfaceInfo);

    // Create a network connection
    const connectionId = networkManager.createConnection('example.com', 80);
    console.log(`Connection created with ID: ${connectionId}`);

    // List all connections
    const connections = networkManager.listConnections();
    console.log("Connections:", connections);

    // Send data over the connection (for example purposes, actual server interaction may vary)
    setTimeout(() => {
        networkManager.sendData(connectionId, 'GET / HTTP/1.1\r\nHost: example.com\r\n\r\n');
    }, 2000);

    // Close the connection after some time
    setTimeout(() => {
        networkManager.closeConnection(connectionId);
    }, 5000);

    console.log("Network manager tests completed.");
}

runNetworkManagerTests();
