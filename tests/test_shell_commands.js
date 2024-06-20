const Shell = require('../shell/shell');
const shell = new Shell();

shell.initialize();

console.log('Testing DIR command');
shell._handleInput('DIR');

console.log('Testing MKDIR command');
shell._handleInput('MKDIR test_dir');

console.log('Testing COPY command');
shell._handleInput('COPY test_shell_commands.js test_dir/test_copy.js');

console.log('Testing DEL command');
shell._handleInput('DEL test_dir/test_copy.js');

console.log('Testing RMDIR command');
shell._handleInput('RMDIR test_dir');

console.log('Testing PAUSE command');
shell._handleInput('PAUSE');

console.log('Testing CLS command');
shell._handleInput('CLS');
