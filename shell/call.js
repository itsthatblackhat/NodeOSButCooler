module.exports = function callCommand(args) {
    if (args.length === 0) {
        console.log('Usage: CALL [batchfile]');
        return;
    }
    const batchfile = args[0];
    // Here you would implement the actual functionality
    console.log(`Calling batch file: ${batchfile}`);
};
