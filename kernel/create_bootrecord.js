const fs = require('fs');
const path = require('path');

const bootRecord = Buffer.alloc(512, 0); // Create a 512-byte buffer initialized with zeros

// Add a simple boot signature at the end of the buffer (optional)
bootRecord[510] = 0x55;
bootRecord[511] = 0xAA;

// Add a bootable partition entry (80h indicates bootable)
// Partition table entries are 16 bytes each, starting at offset 446
const partitionTableOffset = 446;
bootRecord[partitionTableOffset] = 0x80; // Boot indicator (0x80 means bootable)
bootRecord[partitionTableOffset + 1] = 0x01; // Starting head
bootRecord[partitionTableOffset + 2] = 0x01; // Starting sector
bootRecord[partitionTableOffset + 3] = 0x00; // Starting cylinder
bootRecord[partitionTableOffset + 4] = 0x07; // Partition type (0x07 means NTFS)
bootRecord[partitionTableOffset + 5] = 0xFE; // Ending head
bootRecord[partitionTableOffset + 6] = 0xFF; // Ending sector
bootRecord[partitionTableOffset + 7] = 0xFF; // Ending cylinder
bootRecord[partitionTableOffset + 8] = 0x3F; // Relative sectors (start of partition)
bootRecord[partitionTableOffset + 9] = 0x00;
bootRecord[partitionTableOffset + 10] = 0x00;
bootRecord[partitionTableOffset + 11] = 0x00;
bootRecord[partitionTableOffset + 12] = 0x00; // Total sectors in partition
bootRecord[partitionTableOffset + 13] = 0x00;
bootRecord[partitionTableOffset + 14] = 0x00;
bootRecord[partitionTableOffset + 15] = 0x00;

const filePath = path.join(__dirname, 'bootrecord.bin');
fs.writeFileSync(filePath, bootRecord);

console.log('Mock bootrecord.bin with bootable partition created successfully.');
