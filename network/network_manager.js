const net = require('net');
const os = require('os');

class NetworkManager {
    constructor() {
        this.interfaces = new Map(); // Maps interface names to interface information
        this.connections = new Map(); // Maps connection IDs to connection information
        this.nextConnectionId = 1;
    }

    initialize() {
        console.log("Initializing Network Manager...");
        this._setupNetworkInterfaces();
        console.log("Network Manager initialized.");
    }

    _setupNetworkInterfaces() {
        console.log("Setting up network interfaces...");
        const interfaces = os.networkInterfaces();
        for (const [name, infos] of Object.entries(interfaces)) {
            this.interfaces.set(name, infos);
            console.log(`Interface ${name} set up with information:`, infos);
        }
    }

    listInterfaces() {
        console.log("Listing all network interfaces...");
        return Array.from(this.interfaces.keys());
    }

    getInterfaceInfo(interfaceName) {
        console.log(`Getting info for interface: ${interfaceName}`);
        const info = this.interfaces.get(interfaceName);
        if (!info) {
            throw new Error(`Interface ${interfaceName} not found`);
        }
        return info;
    }

    createConnection(host, port) {
        const connectionId = this.nextConnectionId++;
        console.log(`Creating connection ${connectionId} to ${host}:${port}`);

        const socket = new net.Socket();
        socket.connect(port, host, () => {
            console.log(`Connection ${connectionId} established to ${host}:${port}`);
            this.connections.set(connectionId, { host, port, socket, status: 'connected' });
        });

        socket.on('data', (data) => {
            console.log(`Data received on connection ${connectionId}: ${data}`);
        });

        socket.on('close', () => {
            console.log(`Connection ${connectionId} closed`);
            this.connections.delete(connectionId);
        });

        socket.on('error', (error) => {
            console.error(`Error on connection ${connectionId}:`, error);
            this.connections.delete(connectionId);
        });

        return connectionId;
    }

    closeConnection(connectionId) {
        console.log(`Closing connection ${connectionId}`);
        const connection = this.connections.get(connectionId);
        if (!connection) {
            throw new Error(`Connection ${connectionId} not found`);
        }
        connection.socket.destroy();
        this.connections.delete(connectionId);
        console.log(`Connection ${connectionId} closed`);
    }

    listConnections() {
        console.log("Listing all network connections...");
        return Array.from(this.connections.keys());
    }

    sendData(connectionId, data) {
        console.log(`Sending data on connection ${connectionId}: ${data}`);
        const connection = this.connections.get(connectionId);
        if (!connection) {
            throw new Error(`Connection ${connectionId} not found`);
        }
        connection.socket.write(data);
    }
}

module.exports = NetworkManager;
