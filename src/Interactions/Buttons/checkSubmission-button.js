const {MessageEmbed} = require('discord.js');
const {EMBED_VALIDER} = require("../../config");

async function execute(client, interaction) {

    let idWhitelist = interaction.customId.split(':')[1];
    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);
    let addressData = await client.getAddress(interaction.guild, idWhitelist, interaction.user);

    if (!addressData) return interaction.reply({content: `**You don't have an address for this whitelist**`, ephemeral: true});

    let embed = new MessageEmbed()
        .setColor(EMBED_VALIDER)
        .setTitle("Success: Wallet has been recorded !")
        .setDescription(`The wallet address for ${interaction.user} is recorded as : \`${addressData.adresse}\` in \`${whiteListData.name}\``)
    return interaction.reply({embeds: [embed], ephemeral: true});

};
exports.execute = execute;
exports.button = {
    data: {
        name: "checkSubmission",
    }
};