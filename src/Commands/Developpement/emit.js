async function execute(client, interaction) {

    if (interaction.user.id !== "916444775861850175")
        return interaction.reply({content: `You do not have permission to make this order.`, ephemeral: true});

    const evtChoices = interaction.options.getString("event");

    if (evtChoices == "guildCreate") {
        client.emit("guildCreate", interaction.guild);
        interaction.reply({content: "Event guildCreate émit!", ephemeral: true});
    } else if (evtChoices == "guildDelete") {
        client.emit("guildDelete", interaction.guild);
        interaction.reply({content: "Event guildDelete émit!", ephemeral: true});
    } else if (evtChoices == "guildMemberAdd") {
        client.emit("guildMemberAdd", interaction.member);
    } else if (evtChoices == "guildMemberRemove") {
        client.emit("guildMemberRemove", interaction.member);
    }

};
exports.execute = execute;
exports.slash = {
    data: {
        name: "emit",
        description: "Émettre un événement de votre choix",
        category: "Developpement",
        options: [
            {
                name: "event",
                description: "Choisir un événement à emettre",
                type: "STRING",
                required: true,
                choices: [
                    {
                        name: "guildCreate",
                        value: "guildCreate",
                    },
                    {
                        name: "guildDelete",
                        value: "guildDelete",
                    },
                    {
                        name: "guildMemberAdd",
                        value: "guildMemberAdd",
                    },
                    {
                        name: "guildMemberRemove",
                        value: "guildMemberRemove",
                    }
                ],
            },
        ],
    }
};
