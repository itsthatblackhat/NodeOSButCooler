const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\JSOS';
const outputFile = 'd:\\JSOS\\all_js_files.txt';

const excludedDirs = ['node_modules', '.github', '.idea'];

function isExcludedDir(dir) {
    return excludedDirs.some(excluded => dir.includes(excluded));
}

function writeToFile(content) {
    fs.appendFileSync(outputFile, content, 'utf8');
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    const fileHeader = `===================================================\n[${filePath}]\n\n`;
    const fileFooter = `\n===================================================\n`;

    writeToFile(fileHeader + content + fileFooter);
}

function traverseDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (!isExcludedDir(filePath)) {
                traverseDirectory(filePath);
            }
        } else if (path.extname(file) === '.js') {
            processFile(filePath);
        }
    });
}

function main() {
    if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);  // Remove the output file if it already exists
    }
    traverseDirectory(rootDir);
    console.log('All JavaScript files have been concatenated into', outputFile);
}

main();
