module.exports = function assignCommand(args) {
    if (args.length < 2) {
        console.log('Usage: ASSIGN drive1 drive2');
        return;
    }
    const [drive1, drive2] = args;
    // Here you would implement the actual functionality
    console.log(`Drive ${drive1} assigned to ${drive2}`);
};
