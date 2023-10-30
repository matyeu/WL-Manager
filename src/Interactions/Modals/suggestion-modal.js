const {MessageEmbed} = require("discord.js");
const {EMBED_VALIDER} = require("../../config");

async function execute(client, interaction) {

    let clientData = await client.getClient(interaction.guild);
    let titleSuggestion = interaction.fields.getTextInputValue('titleSuggestion');
    let descriptionSuggestion = interaction.fields.getTextInputValue('descriptionSuggestion');

    await client.createSuggestion(interaction.guild,  clientData.suggestions +1, interaction.user, titleSuggestion, descriptionSuggestion);
    await client.updateClient({suggestions: clientData.suggestions +1});

    let embed = new MessageEmbed()
        .setColor(EMBED_VALIDER)
        .setTitle("")
        .setDescription(`Your suggestion \`${titleSuggestion}\` has been sent to support !`)
        .setFooter({text: `Suggestion ID : ${clientData.bugs +1}`})
    return interaction.reply({embeds: [embed], ephemeral: true});



};
exports.execute = execute;
exports.modal = {
    data: {
        name: "suggestion",
    }
};