const fs = require('fs');
const path = require('path');

function dirCommand(args) {
    const [dirPath = '.'] = args;
    if (!fs.existsSync(dirPath)) {
        console.log(`Directory ${dirPath} does not exist.`);
        return;
    }
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);
        if (stats.isFile()) {
            console.log(`FILE ${file}`);
        } else if (stats.isDirectory()) {
            console.log(`DIR  ${file}`);
        }
    });
}

module.exports = dirCommand;
