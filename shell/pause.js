module.exports = function pauseCommand(callback) {
    console.log('Press any key to continue...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        if (callback) callback();
    });
};
