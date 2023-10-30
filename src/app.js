const {Intents} = require('discord.js');
const {WlManagerClient} = require("./Librairie");
const Logger = require("./Librairie/logger")
const {loadCommands, loadEvents, loadButtons, loadSelectMenus, loadModals} = require("./Librairie/loader");
require("dotenv").config();

const client = new WlManagerClient({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});

require('./Librairie/functions')(client);
loadCommands(client).then(_ => '');
loadEvents(client).then(_ => '');
loadButtons(client).then(_ => '');
loadSelectMenus(client).then(_ => '');
loadModals(client).then(_ => '');

process.on('exit', code => {Logger.client(`Le processus s'est arrêté avec le code: ${code}!`) });

process.on('uncaughtException', (err, origin) => {
    Logger.error(`UNCAUGHT_EXCEPTION: ${err}`);
    console.error(`Origine: ${origin}`)
});

process.on('unhandledRejection', (reason, promise) => {
    Logger.warn(`UNHANDLED_REJECTION: ${reason}`);
    console.log(promise);
});

process.on('warning', (...args) => Logger.warn(...args));
client.login(process.env.TOKEN).then(_ => '');