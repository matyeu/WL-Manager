const {EMBED_GENERAL, FOOTER} = require("../../config");
const {MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

async function execute(client, interaction) {

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setTitle(`❓ Getting help`)
        .setDescription(
            `You need information ? You've come to the right place ! 
            Consult the list of topics to learn more about ${interaction.client.user?.username}.`)
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setCustomId("selectHelp")
            .setPlaceholder("Select a topic")
            .addOptions([
                {
                    label: "General commands",
                    description: "Have the list of general orders",
                    emoji: "🎈",
                    value: "general",
                },
                {
                    label: "Useful links",
                    description: "Have a list of useful links",
                    emoji: "🔗",
                    value: "link",
                },
            ])
    );

    await interaction.reply({embeds: [embed], components: [row]})
};
exports.execute = execute;
exports.slash = {
    data: {
        name: "help",
        description: "Command help",
        category: "Community",
    }
};
