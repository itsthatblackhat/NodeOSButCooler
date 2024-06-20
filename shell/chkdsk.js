module.exports = function chkdskCommand(args) {
    if (args.length === 0) {
        console.log('Usage: CHKDSK [drive]');
        return;
    }
    const drive = args[0];
    // Here you would implement the actual functionality
    console.log(`CHKDSK performed on drive: ${drive}`);
};
