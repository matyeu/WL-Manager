const Logger = require("../../Librairie/logger");
const chalk = require("chalk");
const mongoose = require("mongoose");


async function execute(client) {
    console.log(chalk.grey('--------------------------------'));
    Logger.client(`- Connecté sous le nom de "${client.user.tag}"`);
    Logger.client(`- Pour ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} utilisateurs, pour ${client.channels.cache.size} salons, pour ${client.guilds.cache.size} serveurs discord !`);

    await mongoose.connect(process.env.DBCONNECTION, {
        autoIndex: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    }).then(() => {
        Logger.client('- connecté à la base de données');
        console.log(chalk.grey('--------------------------------'));
    })
        .catch(err => { Logger.error(err); });

    let clientData = await client.getClient()
    if (!clientData) await client.createClient();

    for (let guild of client.guilds.cache.map(guild => guild)) {
        let guildData = await client.getGuild(guild);
        if (!guildData) await client.createGuild(guild);

        for (let member of guild.members.cache.map(member => member)) {
            if (member.user.bot) continue;
            let userData = await client.getUser(guild, member);
            if (!userData) await client.createUser(guild, member);
            if (userData && member.user.username !== userData.name) await client.updateUser(guild, member, { name: member.user.username });
        };

        for (const command of client.slashCommands.map(command => command)) await guild.commands.create(command.slash.data);


    }

};

exports.execute = execute;
