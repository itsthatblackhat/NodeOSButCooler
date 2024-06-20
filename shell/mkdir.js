const fs = require('fs');

function mkdirCommand(args) {
    const dirPath = args[0];

    try {
        fs.mkdirSync(dirPath);
        console.log(`Directory created: ${dirPath}`);
    } catch (error) {
        console.error(`Error creating directory ${dirPath}:`, error.message);
    }
}

module.exports = mkdirCommand;
