const fs = require('fs');

function delCommand(args) {
    const filePath = args[0];

    try {
        fs.unlinkSync(filePath);
        console.log(`Deleted ${filePath}`);
    } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error.message);
    }
}

module.exports = delCommand;
