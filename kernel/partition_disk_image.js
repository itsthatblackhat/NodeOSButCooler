const fs = require('fs');
const path = require('path');

const diskImagePath = path.join(__dirname, 'mock_disk.img');
const diskImage = fs.readFileSync(diskImagePath);

// Define partition table (MBR)
// This is a very simplified example; in reality, you would need a more complex structure.
const mbr = Buffer.alloc(512, 0);
mbr[510] = 0x55;
mbr[511] = 0xAA;

// Partition entry: bootable, start at sector 1, size 2048 sectors (1 MB)
// This is a simplified example; the real MBR partition entry has more fields.
const partitionEntryOffset = 446;
mbr[partitionEntryOffset] = 0x80; // Bootable flag
mbr[partitionEntryOffset + 1] = 0x00; // Starting head
mbr[partitionEntryOffset + 2] = 0x01; // Starting sector
mbr[partitionEntryOffset + 3] = 0x00; // Starting cylinder
mbr[partitionEntryOffset + 4] = 0x07; // Partition type (NTFS)
mbr[partitionEntryOffset + 5] = 0x00; // Ending head
mbr[partitionEntryOffset + 6] = 0x3F; // Ending sector
mbr[partitionEntryOffset + 7] = 0x00; // Ending cylinder
mbr[partitionEntryOffset + 8] = 0x01; // Relative sectors (starting at sector 1)
mbr[partitionEntryOffset + 9] = 0x00;
mbr[partitionEntryOffset + 10] = 0x00;
mbr[partitionEntryOffset + 11] = 0x00;
mbr[partitionEntryOffset + 12] = 0x00; // Total sectors in partition
mbr[partitionEntryOffset + 13] = 0x08;
mbr[partitionEntryOffset + 14] = 0x00;
mbr[partitionEntryOffset + 15] = 0x00;

// Write MBR to the disk image
diskImage.write(mbr.toString('binary'), 0, 512, 'binary');

// Write back to disk image
fs.writeFileSync(diskImagePath, diskImage);

console.log('Disk image partitioned successfully.');
