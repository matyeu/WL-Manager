const {Collection} = require("discord.js");
const Logger = require("../../Librairie/logger");

async function execute(client, interaction) {
    if (interaction.isCommand() && interaction.inGuild()) {
        try {
            let command = client.slashCommands.get(interaction.commandName);
            if (!command) return interaction.reply({
                content: `The \`${interaction.commandName}\` command cannot be found !`,
                ephemeral: true
            });

            if (!interaction.member.permissions.has([command.slash.data.permissions]))
                return interaction.reply({content: `**You don't have the permission to use this command !**`, ephemeral: true});

            if (!client.cooldowns.has(interaction.commandName)) client.cooldowns.set(interaction.commandName, new Collection());
            const timeNow = Date.now();
            const tStamps = client.cooldowns.get(interaction.commandName);
            const cdAmount = (command.slash.data.cooldown || 5) * 1000;
            if (tStamps.has(interaction.user.id)) {
                const cdExpirationTime = tStamps.get(interaction.user.id) + cdAmount;
                if (timeNow < cdExpirationTime) {
                    let timeLeft = (cdExpirationTime - timeNow) / 1000;
                    await interaction.reply({
                        content: `**Please wait ${timeLeft.toFixed(0)} seconde(s) o run this command again.**`,
                        ephemeral: true
                    });
                    return Logger.warn(`Le cooldown a été déclenché par ${interaction.user.tag} sur la commande ${interaction.commandName}`);
                };
            }
            tStamps.set(interaction.user.id, timeNow);
            setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);

            await command.execute(client, interaction);
            Logger.client(`La commande ${interaction.commandName} a été utilisée par ${interaction.user.tag} sur le serveur ${interaction.guild?.name}`);
        } catch (err) {
            console.error(err)
        }
    } else if (interaction.isButton()) {
        try {
            const button = client.buttons.get(interaction.customId.split(':')[0]);
            await button.execute(client, interaction)
        } catch (err) {
            console.error(err)
        }
    } else if (interaction.isSelectMenu()) {
        try {
            const selectMenu = client.selects.get(interaction.customId.split(':')[0]);
            await selectMenu.execute(client, interaction)
        } catch (err) {
            console.error(err)
        }
    } else if (interaction.isModalSubmit()) {
        try {
            const modal = client.modals.get(interaction.customId.split(':')[0]);
            await modal.execute(client, interaction);
        } catch (err) {
            console.error(err)
        }
    }
};
exports.execute = execute;