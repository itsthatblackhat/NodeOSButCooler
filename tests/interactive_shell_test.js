// interactive_shell_test.js
const Shell = require('../shell/shell');

const shell = new Shell();
shell.initialize();

shell.rl.on('line', (line) => {
    const input = line.trim();
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'dir':
            shell._handleInput('dir');
            break;
        case 'mkdir':
            shell._handleInput(`mkdir ${args.join(' ')}`);
            break;
        case 'copy':
            shell._handleInput(`copy ${args.join(' ')}`);
            break;
        case 'del':
            shell._handleInput(`del ${args.join(' ')}`);
            break;
        case 'rmdir':
            shell._handleInput(`rmdir ${args.join(' ')}`);
            break;
        case 'cls':
            shell._handleInput('cls');
            break;
        case 'pause':
            shell._handleInput('pause');
            break;
        case 'exit':
            shell.rl.close();
            break;
        default:
            console.log(`Unknown command: ${command}`);
            break;
    }
    shell.rl.prompt();
});

shell.rl.prompt();
