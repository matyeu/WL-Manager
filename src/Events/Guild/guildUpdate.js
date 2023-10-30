async function execute(client, oldGuild, newGuild) {
    if (oldGuild.name !== newGuild.name)
        await client.updateGuild(oldGuild, {name: newGuild.name})
};
exports.execute = execute