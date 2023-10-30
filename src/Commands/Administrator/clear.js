async function execute(client, interaction) {
    let idWhitelist = interaction.options.getNumber('id');
    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);
    let addressWl = await client.getAdressWl(interaction.guild, idWhitelist);

    if (!whiteListData) return interaction.reply({content: `**Whitelist not found**`, ephemeral: true});
    if (addressWl.length < 1) return interaction.reply({content: `**No address found for this whitelist**`, ephemeral: true});

    await client.getAdressWl(interaction.guild, idWhitelist).then(async adressWl => {
        adressWl.forEach(address => {address.delete()});
        await client.updateWhitelist(interaction.guild, idWhitelist, {members: []})
        return interaction.reply({content: `**All addresses for this whitelist have been deleted**`, ephemeral: true});
    })

};
exports.execute = execute;
exports.slash = {
    data: {
        name: "clear",
        description: "Delete all addresses for a whitelist",
        category: "Administrator",
        permissions: ['ADMINISTRATOR'],
        options: [
            {
                name: "id",
                description: "id of the whitelist",
                type: "NUMBER",
                required: true
            },
        ]
    }
};
