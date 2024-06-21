const fs = require('fs');
const path = require('path');

// Create a 10 MB disk image
const diskSize = 10 * 1024 * 1024; // 10 MB
const diskImage = Buffer.alloc(diskSize, 0); // Initialize with zeros

const diskImagePath = path.join(__dirname, 'mock_disk.img');
fs.writeFileSync(diskImagePath, diskImage);

console.log('Mock disk image created successfully at', diskImagePath);
