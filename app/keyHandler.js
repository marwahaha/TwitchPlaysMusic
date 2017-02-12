var exec = require('child_process').exec,
config = require('./config.js'),
currentNotes = [],
lastTime = {},
throttledCommands = config.throttledCommands,
regexThrottle = new RegExp('^(' + throttledCommands.join('|') + ')$', 'i'),
regexFilter = new RegExp('^(' + config.filteredCommands.join('|') + ')$', 'i');

for (var i = 0; i < throttledCommands.length; i++) {
    lastTime[throttledCommands[i]] = new Date().getTime();
}

function sendKey(command) {
    //if doesn't match the filtered words
    if (!command.match(regexFilter)) {
        var allowKey = true;
        //throttle certain commands (not individually though)
        if (command.match(regexThrottle)) {
            var newTime = new Date().getTime();
            if (newTime - lastTime[command] < config.timeToWait) {
                allowKey = false;
            } else {
                lastTime = newTime;
            }
        }
        if (allowKey) {
            currentNotes.push([command, new Date().getTime()]);
        }
    }
}

function generateSheetMusic() {
    var now = new Date().getTime();
    for (var i = 0; i < currentNotes.length; i++) {
        currentNotes[i][1] -= (now  - config.sheetMusicGenerationTime);
    }
    console.log(`currentNotes: ${currentNotes.join(".")}`);

    // WARNING: Shell metacharacters may interrupt execution of this program...
    exec('python ./app/generate_sheet_music.py' + ' ' + config.sheetMusicGenerationTime + ' ' + currentNotes.join("."), (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
    currentNotes = [];
}

exports.sendKey = sendKey;
exports.generateSheetMusic = generateSheetMusic;
