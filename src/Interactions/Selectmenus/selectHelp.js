const {EMBED_GENERAL, FOOTER} = require("../../config");
const {MessageEmbed} = require('discord.js')
const {readdirSync} = require("fs");

async function execute(client, interaction) {

    const embed = new MessageEmbed()
        .setColor(EMBED_GENERAL)
        .setAuthor({name: `❓ Getting help`})
        .setTimestamp()
        .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})})

    await interaction.update({content: null}).then(() => {
        switch (interaction.values[0]) {
            case 'general':
                const commandFolder = readdirSync('./src/Commands');
                embed.setTitle(`🎈 The list of orders 🎈 `)
                for (const category of commandFolder) {
                    if (category === "Developpement") continue;
                    embed.addFields({
                        name: `${category}`,
                        value: `\`${client.slashCommands.filter(cmd => cmd.slash.data.category == category).map(cmd => cmd.slash.data.name).join(',')}\``
                    })
                }
                break;
            case 'link':
                embed.setDescription(`
                **• Link site :** ${process.env.SITE}
                **• Link support :** ${process.env.SUPPORT}
                `)
                break;
            default:
                interaction.reply({content: `**This value cannot be found !**`, ephemeral: true})
        };
    });
    return interaction.followUp({embeds: [embed]})
};

exports.execute = execute;
exports.select = {
    data: {
        name: "selectHelp",
    }
};