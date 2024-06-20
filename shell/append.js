module.exports = function appendCommand(args) {
    if (args.length === 0) {
        console.log('Usage: APPEND [path]');
        return;
    }
    const path = args[0];
    // Here you would implement the actual functionality
    console.log(`Append path set to: ${path}`);
};
