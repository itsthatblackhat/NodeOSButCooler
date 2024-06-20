const fs = require('fs');
const path = require('path');

function dirCommand(args) {
    const dirPath = args[0] || process.cwd();

    try {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            console.log(`${stats.isDirectory() ? 'DIR' : 'FILE'} ${file}`);
        });
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error.message);
    }
}

module.exports = dirCommand;
