const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {EMBED_INFO} = require("../../config");

async function execute(client, interaction) {
    let idWhitelist = interaction.options.getNumber('id');
    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);
    let adressWl = await client.getAdressWl(interaction.guild, idWhitelist);

    if (!whiteListData) return interaction.reply({content: `**Whitelist not found**`, ephemeral: true});

    let embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle(`Public Whitelist: ${whiteListData.name}`)
        .setDescription(`${whiteListData.description}`)
        .setThumbnail(whiteListData.picture)
        .addFields(
            {name: `Date Created:`, value: `${whiteListData.date}`, inline: false},
            {name: `Required Rôle:`, value: `${whiteListData.required_role ? whiteListData.required_role : 'None Required'}`, inline: true},
            {name: `Whitelist Rôle:`, value: `${whiteListData.whitelist_role ? whiteListData.whitelist_role : 'None Required'}`, inline: true},
            {name: `Blockchain:`, value: `${whiteListData.blockchain}`, inline: true},
            {name: `Members`, value: `${whiteListData.members.length}`, inline: true},
            {name: `Adresses`, value: `${adressWl.length}`, inline: true},
            {name: `\u200b`, value: `\u200b`, inline: true}
        )
        .setFooter({text: `Whitelist ID : ${whiteListData.id}`,
            iconURL: interaction.client.user.displayAvatarURL({dynamic: true, format: "png"})});

    let button = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`downloadData:${whiteListData.id}`)
                .setLabel("Download Data")
                .setStyle("PRIMARY")
        )

    return interaction.reply({embeds: [embed], components: [button]});
};
exports.execute = execute;
exports.slash = {
    data: {
        name: "info",
        description: "Info about the whitelist",
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
