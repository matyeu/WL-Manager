const {MessageEmbed} = require("discord.js");
const {EMBED_VALIDER} = require("../../config");

async function execute(client, interaction) {

    let clientData = await client.getClient(interaction.guild);
    let titleBug = interaction.fields.getTextInputValue('titleBug');
    let descriptionBug = interaction.fields.getTextInputValue('descriptionBug');

    await client.createBug(interaction.guild,  clientData.bugs +1, interaction.user, titleBug, descriptionBug);
    await client.updateClient({bugs: clientData.bugs +1});

    let embed = new MessageEmbed()
        .setColor(EMBED_VALIDER)
        .setTitle("Bug Reported")
        .setDescription(`Your bug \`${titleBug}\` has been sent to support !`)
        .setFooter({text: `Bug ID : ${clientData.bugs +1}`})
    return interaction.reply({embeds: [embed], ephemeral: true});



};
exports.execute = execute;
exports.modal = {
    data: {
        name: "bugReport",
    }
};