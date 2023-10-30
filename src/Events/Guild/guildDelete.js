async function execute(client, guild) {
    let guildData = await client.getGuild(guild);

    if (guildData) {
        await client.getWlServer(guild).then(async wlServer => {
            wlServer.forEach(async wl => {
                await client.getAdressWl(guild, wl.id).then(async adressWl => {
                    adressWl.forEach(address => {
                        address.delete()
                    });
                    await wl.delete();
                })
            });
        });
        return guildData.delete();
    }
};
exports.execute = execute;