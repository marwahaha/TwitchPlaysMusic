var nconf = require('nconf').argv().env().file({ file:'config.json' });

var commands = []; // List of commands to check for
var regexCommands;
var username = process.env.TWITCH_USERNAME || nconf.get('TWITCH_USERNAME');
var oauth = process.env.TWITCH_OAUTH || nconf.get('TWITCH_OAUTH');
var channel = process.env.TWITCH_CHANNEL || nconf.get('TWITCH_CHANNEL');
var programName = process.env.CONFIG_PROGRAM_NAME || nconf.get('CONFIG_PROGRAM_NAME');
var maxCharName = process.env.CONFIG_MAX_CHAR_NAME || nconf.get('CONFIG_MAX_CHAR_NAME');
var maxCharCommand = process.env.CONFIG_MAX_CHAR_COMMAND || nconf.get('CONFIG_MAX_CHAR_COMMAND');
var sendKey = process.env.CONFIG_SEND_KEY || nconf.get('CONFIG_SEND_KEY');
var serverIP = process.env.TWITCH_IP || nconf.get('TWITCH_IP');
var filteredCommands = process.env.CONFIG_FILTERED_COMMANDS || nconf.get('CONFIG_FILTERED_COMMANDS');
var throttledCommands = process.env.CONFIG_THROTTLED_COMMANDS || nconf.get('CONFIG_THROTTLED_COMMANDS');
var sheetMusicGenerationTime = process.env.CONFIG_SHEET_MUSIC_GENERATION_TIME || nconf.get('CONFIG_SHEET_MUSIC_GENERATION_TIME');
// WARNING: Probably, special characters in the regex could break this program
if (process.env.CONFIG_REGEXCOMMANDS || nconf.get('CONFIG_REGEXCOMMANDS')) {
    regexCommands = new RegExp(process.env.CONFIG_REGEXCOMMANDS || nconf.get('CONFIG_REGEXCOMMANDS'), "i");
}

var ircConfig = {
    server: serverIP || 'irc.twitch.tv',    // Ex: irc.twitch.tv or 199.9.252.26
    nick: username,                         // Your twitch username
    password: oauth,                        // oauth token from www.twitchapps.com/tmi
    channel: channel,                       // name of channel
    printToConsole: true,                   // If you want to print usernames/commands like in twitchplayspokemon
    maxCharName: maxCharName || 8,          // Maximum characters to show for a person's name in the console log
    maxCharCommand: maxCharCommand || 10,   // Maximum characters to show for a command in the console log
                                            // Ex. left => left since only 4 char, democracy => democra
    filteredCommands: filteredCommands || [],   // If you need to filter the commands sent to the program
                                            // Ex: democracy/anarchy since they don't affect the program itself
    throttledCommands: throttledCommands || [], // If you want to prevent people from using from command too often (eg. ["start"])
    timeToWait: 10000,                      // Throttle time in seconds. Ex: you can limit 'start' so it's only used every 10 sec
    sendKey: sendKey,                       // send key to program (in this case, it aggregates notes for MuseScore)
    regexCommands: regexCommands,           // twitch commands to look for (regex)
    commands: commands,                     // twitch commands to look for in (array)
    sheetMusicGenerationTime: sheetMusicGenerationTime || 5000, // in milliseconds
};

module.exports = ircConfig;
