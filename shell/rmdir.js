const fs = require('fs');

function rmdirCommand(args) {
    const dirPath = args[0];

    try {
        fs.rmdirSync(dirPath);
        console.log(`Directory removed: ${dirPath}`);
    } catch (error) {
        console.error(`Error removing directory ${dirPath}:`, error.message);
    }
}

module.exports = rmdirCommand;
