const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {EMBED_GENERAL} = require("../../config");

async function execute(client, interaction) {
    let idWhitelist = interaction.options.getNumber('id');
    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);

    if (!whiteListData) return interaction.reply({content: `**Whitelist not found**`, ephemeral: true});

    let embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setTitle(`Public Whitelist: ${whiteListData.name}`)
        .setThumbnail(whiteListData.picture)
        .setDescription(`${whiteListData.description}`)
        .addFields(
            {name: `Required Rôle:`, value: `${whiteListData.required_role ? whiteListData.required_role : 'None Required'}`, inline: true},
            {name: `Whitelist Rôle:`, value: `${whiteListData.whitelist_role ? whiteListData.whitelist_role : 'None Required'}`, inline: true},
            {name: `Blockchain:`, value: `${whiteListData.blockchain}`, inline: true},
        )
        .setFooter({text: `Whitelist ID : ${whiteListData.id}`,
            iconURL: interaction.client.user.displayAvatarURL({dynamic: true, format: "png"})});

    let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`submit:${whiteListData.id}`)
                .setLabel("Submit/Resubmit")
                .setStyle("PRIMARY")
        )
        .addComponents(
            new MessageButton()
                .setCustomId(`checkSubmission:${whiteListData.id}`)
                .setLabel("Check Submission")
                .setStyle("SECONDARY")
        )

    await interaction.reply({content: `**Whitelist sent successfully**`, ephemeral: true})
    return interaction.channel.send({embeds: [embed], components: [buttons]});

};
exports.execute = execute;
exports.slash = {
    data: {
        name: "panel",
        description: "Show the panel for a whitelist",
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
