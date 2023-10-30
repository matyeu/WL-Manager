const {Modal, TextInputComponent, MessageActionRow} = require("discord.js");

async function execute(client, interaction) {

    let modal = new Modal()
        .setCustomId('bugReport')
        .setTitle('Report a bug');

    const titleBug = new TextInputComponent()
        .setCustomId('titleBug')
        .setLabel("What is the title of the bug ?")
        .setRequired(true)
        .setStyle('SHORT');

    const descriptionBug = new TextInputComponent()
        .setCustomId('descriptionBug')
        .setLabel("What is the description of the bug ?")
        .setRequired(true)
        .setStyle('PARAGRAPH');


    const titleBugRow = new MessageActionRow().addComponents(titleBug);
    const descriptionBugRow = new MessageActionRow().addComponents(descriptionBug);

    await modal.addComponents(titleBugRow, descriptionBugRow);
    await interaction.showModal(modal);

};
exports.execute = execute;
exports.slash = {
    data: {
        name: "bugreport",
        description: "Report a bug",
        category: "Community",
    }
};
