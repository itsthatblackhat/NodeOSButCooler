const fs = require('fs');

function copyCommand(args) {
    const [source, destination] = args;

    try {
        fs.copyFileSync(source, destination);
        console.log(`Copied ${source} to ${destination}`);
    } catch (error) {
        console.error(`Error copying file from ${source} to ${destination}:`, error.message);
    }
}

module.exports = copyCommand;
