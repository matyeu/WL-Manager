async function execute(client, interaction) {
    let idWhitelist = interaction.options.getNumber('id');
    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);

    if (!whiteListData) return interaction.reply({content: `**Whitelist not found**`, ephemeral: true});

    await client.getAdressWl(interaction.guild, idWhitelist).then(adressWl => {
        adressWl.forEach(address => {address.delete()})
    })

    await whiteListData.delete();
    return interaction.reply({content: `**Whitelist successfully deleted**`, ephemeral: true});

};
exports.execute = execute;
exports.slash = {
    data: {
        name: "delete",
        description: "Delete a whitelist",
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
