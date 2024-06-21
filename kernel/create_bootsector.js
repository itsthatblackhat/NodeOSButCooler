const fs = require('fs');
const path = require('path');

const bootSector = Buffer.alloc(512, 0); // Create a 512-byte buffer initialized with zeros

// Add a simple boot signature at the end of the buffer (optional)
bootSector[510] = 0x55;
bootSector[511] = 0xAA;

const filePath = path.join(__dirname, 'bootsector.bin');
fs.writeFileSync(filePath, bootSector);

console.log('Mock bootsector.bin created successfully at', filePath);
