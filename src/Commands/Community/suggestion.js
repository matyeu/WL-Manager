const {Modal, TextInputComponent, MessageActionRow} = require("discord.js");

async function execute(client, interaction) {

    let modal = new Modal()
        .setCustomId('suggestion')
        .setTitle('Suggest a feature');

    const titleSuggestion = new TextInputComponent()
        .setCustomId('titleSuggestion')
        .setLabel("What is the title of the suggestion ?")
        .setRequired(true)
        .setStyle('SHORT');

    const descriptionSuggestion = new TextInputComponent()
        .setCustomId('descriptionSuggestion')
        .setLabel("What is the description of the suggestion ?")
        .setRequired(true)
        .setStyle('PARAGRAPH');


    const titleSuggestionRow = new MessageActionRow().addComponents(titleSuggestion);
    const descriptionSuggestionRow = new MessageActionRow().addComponents(descriptionSuggestion);

    await modal.addComponents(titleSuggestionRow, descriptionSuggestionRow);
    await interaction.showModal(modal);

};
exports.execute = execute;
exports.slash = {
    data: {
        name: "suggestion",
        description: "Suggest a feature",
        category: "Community",
    }
};
