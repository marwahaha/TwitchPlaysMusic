# Twitch Plays Music

(inspired by [TwitchPlaysPokemon] and made with [TwitchPlaysX])

Sends live Twitch chat into a Python script, generating on-the-fly sheet music with MuseScore.

This uses the IRC from a Twitch channel, processes it with [music21], and outputs with [MuseScore].

Tested on Mac, and should also work on Linux machines. Probably works on Windows machines.

Installation (node, etc)
--------------
```sh
git clone https://github.com/hzoo/TwitchPlaysX.git
cd TwitchPlaysX
npm install
```

Setup
--------------

### Create config.json
Create a config.json file  in the root directory of this project.
To get your Oauth token, go to http://www.twitchapps.com/tmi.

The config options are used in the [config.js](/app/config.js) file.

```js
// example config.json
// you can also set the environment variables in node (for heroku)
{

    "TWITCH_OAUTH": "OAUTH_HERE",
    "TWITCH_USERNAME": "TWITCH_NAME_HERE",
    "TWITCH_CHANNEL": "#CHANNEL_HERE",
    "CONFIG_MAX_CHAR_NAME": 9,
    "CONFIG_MAX_CHAR_COMMAND": 20,
    "CONFIG_SEND_KEY": true,
    "CONFIG_SHEET_MUSIC_GENERATION_TIME": 4000,
    "CONFIG_FILTERED_COMMANDS": [],
    "CONFIG_THROTTLED_COMMANDS": [],
    "CONFIG_REGEXCOMMANDS": "^[A-G][b#-]?[1-7]?$"
}
```

Running It!
--------------

```sh
# go to the root folder, make sure you did `npm install`, then
npm start
```

## Contributions
Feel free to give suggestions or report bugs

[TwitchPlaysPokemon]:http://twitch.tv/TwitchPlaysPokemon
[TwitchPlaysX]:https://github.com/hzoo/TwitchPlaysX
[music21]:http://web.mit.edu/music21/
[MuseScore]:https://musescore.org/
