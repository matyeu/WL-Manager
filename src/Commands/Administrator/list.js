const {MessageEmbed} = require("discord.js");
const {EMBED_INFO, FOOTER} = require("../../config");

async function execute(client, interaction) {

    let wlServer = await client.getWlServer(interaction.guild)
    if (!wlServer) return interaction.reply({content: `**This server doesn't have a whitelist**`, ephemeral: true});

    let embed = new MessageEmbed()
        .setColor(EMBED_INFO)
        .setTitle("Whitelist Server")
        .setDescription(`The server currently has \`${wlServer.length}\` whiteList(s) !`)
        .setFooter({text: FOOTER, iconURL: client.user.avatarURL({dynamic: true})})

    await client.getWlServer(interaction.guild).then(async wlServer => {
        wlServer.forEach(async wl => {
            embed.addFields(
                {name: `${wl.name}`,
                    value: `**• Id:** \`${wl.id}\`\n**• Members:** \`${wl.members.length}\` `,
                    inline: true},);
        });
    });

    return interaction.reply({embeds: [embed], ephemeral: true});


};
exports.execute = execute;
exports.slash = {
    data: {
        name: "list",
        description: "List all whitelists",
        category: "Administrator",
        permissions: ['ADMINISTRATOR'],
    }
};
