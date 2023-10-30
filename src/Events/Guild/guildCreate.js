async function execute(client, guild) {
    await client.createGuild(guild);
};
exports.execute = execute;