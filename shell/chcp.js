module.exports = function chcpCommand(args) {
    if (args.length === 0) {
        console.log('Current code page: 437');
        return;
    }
    const codePage = args[0];
    // Here you would implement the actual functionality
    console.log(`Code page set to: ${codePage}`);
};
