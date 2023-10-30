const {MessageEmbed} = require("discord.js");
const {EMBED_VALIDER} = require("../../config");

async function execute(client, interaction) {

    let idWhitelist = interaction.customId.split(':')[1];
    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);
    let walletAddress = interaction.fields.getTextInputValue('walletAddress');
    let whitelistRole = interaction.guild.roles.cache.find(whitelistRole => whitelistRole.id === whiteListData.whitelist_role);

    await client.createAddress(interaction.guild, idWhitelist, interaction.user, walletAddress)

    let members = whiteListData.members;
    members.push(interaction.user.id);
    await client.updateWhitelist(interaction.guild, idWhitelist, {members: members});

    if (whitelistRole && !interaction.member.roles.cache.has(whitelistRole.id))
        await interaction.member.roles.add(whitelistRole, `${interaction.user.tag} just submitted an address`);

    let embed = new MessageEmbed()
        .setColor(EMBED_VALIDER)
        .setTitle("Wallet Updated")
        .setDescription(`Your wallet address in whitelist \`${whiteListData.name}\` has been set to : \`${walletAddress}\``)
    return interaction.reply({embeds: [embed], ephemeral: true});



};
exports.execute = execute;
exports.modal = {
    data: {
        name: "submitAddress",
    }
};