const {Client, Collection} = require('discord.js');
const fs = require('fs');

class WlManagerClient extends Client {
    config;
    slashCommands;
    cooldowns;
    buttons;
    selects;
    modals;
    constructor(options) {
        super(options);
        this.config = require('../config.js');
        this.slashCommands = new Collection();
        this.cooldowns = new Collection();
        this.buttons = new Collection();
        this.selects = new Collection();
        this.modals = new Collection();
    };

    getEmoji(id) {
        return this.emojis.cache.get(id);
    };

    getRole(guild, id) {
        return guild.roles.cache.get(id);
    };

    async getChannel(guild, snowflake, messageData) {
        if (snowflake) {
            let channel = guild.channels.cache.get(snowflake);
            if (channel) {
                await channel.send(messageData)
            }
        }
    };
}

function getFilesRecursive(directory, aFiles) {
    const files = fs.readdirSync(directory);
    aFiles = aFiles ?? [];
    files.forEach((file) => {
        const path = `${directory}/${file}`;
        if (fs.statSync(path).isDirectory()) {
            aFiles = getFilesRecursive(path, aFiles);
        }
        else {
            aFiles.push(path);
        }
    });
    return aFiles;
};

module.exports = {
    WlManagerClient,
    getFilesRecursive,
}