const {MessageEmbed} = require("discord.js");
const {EMBED_INFO, FOOTER, } = require("../../config");

async function execute(client, interaction) {
    const start = Date.now();
    interaction.reply({content: "Pong !"}).then(() => {
        const end = Date.now();
        const time = end - start;

        let botLatency = `${'```js'}\n ${Math.round(time)} ms ${'```'}`
        let apiLatency = `${'```js'}\n ${Math.round(interaction.client.ws.ping)} ms ${'```'}`

        const embed = new MessageEmbed()
            .setColor(EMBED_INFO)
            .setTitle(`🏓 | Response time`)
            .addFields(
                {name: `Bot latency`, value: botLatency, inline: true},
                {name: `Latency of the api`, value: apiLatency, inline: true},
            )
            .setTimestamp()
            .setFooter({text: FOOTER, iconURL: interaction.client.user?.displayAvatarURL({dynamic: true, format: "png"})});

        interaction.editReply({content: null, embeds: [embed]});
    });


};
exports.execute = execute;
exports.slash = {
    data: {
        name: "ping",
        description: "Ping ? Pong !",
        category: "Community",
    }
};
