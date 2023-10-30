const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');

async function execute(client, interaction) {

    let idWhitelist = interaction.customId.split(':')[1];
    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);
    let addressData = await client.getAddress(interaction.guild, idWhitelist, interaction.user);

   if (whiteListData.required_role && !interaction.member.roles.cache.has(whiteListData.required_role))
        return interaction.reply({content: `**You must have the <@&${whiteListData.required_role}> role to submit an address**`, ephemeral: true});

   if (addressData) return interaction.reply({content: `**You already have an address for this whitelist**`, ephemeral: true});

    let modal = new Modal()
        .setCustomId(`submitAddress:${idWhitelist}`)
        .setTitle('Submit Wallet Address !');

    const walletAddress = new TextInputComponent()
        .setCustomId('walletAddress')
        .setLabel("Wallet Address")
        .setStyle("SHORT")
        .setRequired(true)

    const walletAddressRow = new MessageActionRow().addComponents(walletAddress);
    modal.addComponents(walletAddressRow);
    await interaction.showModal(modal);
};
exports.execute = execute;
exports.button = {
    data: {
        name: "submit",
    }
};