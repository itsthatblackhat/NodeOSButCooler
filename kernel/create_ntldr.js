const fs = require('fs');
const path = require('path');

const ntldrContent = "This is a mock NTLDR file."; // Simple content for NTLDR

const filePath = path.join(__dirname, 'NTLDR');
fs.writeFileSync(filePath, ntldrContent);

console.log('Mock NTLDR file created successfully at', filePath);
