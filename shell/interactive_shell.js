const readline = require('readline');
const Shell = require('./shell');

class InteractiveShell {
    constructor() {
        this.shell = new Shell();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'JSOS> '
        });
    }

    initialize() {
        console.log("Initializing Interactive Shell...");
        this.shell.initialize();
        this._setupInteractiveShell();
    }

    _setupInteractiveShell() {
        this.rl.prompt();

        this.rl.on('line', (line) => {
            const input = line.trim();
            this.shell._handleInput(input);
            this.rl.prompt();
        });

        this.rl.on('close', () => {
            console.log('Interactive Shell closed.');
            process.exit(0);
        });
    }
}

const interactiveShell = new InteractiveShell();
interactiveShell.initialize();
