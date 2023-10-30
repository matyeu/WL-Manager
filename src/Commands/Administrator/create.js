const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {EMBED_GENERAL} = require("../../config");
const shorten = require('isgd');

async function execute(client, interaction) {

    let guilddata = await client.getGuild(interaction.guild);

    if (guilddata.whitelist_active === 2 && !guilddata.premium)
        return interaction.reply({content: `**You must be a premium to own several whitelists !**`, ephemeral: true});

    let nameWL = interaction.options.getString('name');
    let descriptionWL = interaction.options.getString('description');
    let pictureWl = interaction.options.getString('picture');
    let blockchain = interaction.options.getString('blockchain');
    let requiredRole = interaction.options.getRole('requiredrole');
    let whitelistRole = interaction.options.getRole('whitelistrole');

    shorten.shorten(pictureWl, async function (res) {
        if (res.startsWith('Error:')) return interaction.reply({
            content: `**Please host your image on https://www.zupimages.net/ and paste the link here.**`,
            ephemeral: true
        });

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = 0 + dd;
        if (mm < 10) mm = 0 + mm;

        let hour = new Date().toLocaleString('en-US', {hour: 'numeric',});
        let minutes = new Date().toLocaleString('en-US', {minute: 'numeric',});

        await client.createWhitelist(
            interaction.guild, guilddata.whitelist_active + 1, nameWL, descriptionWL, pictureWl, blockchain,
            requiredRole ? requiredRole.id : null, whitelistRole ? whitelistRole.id : null,
            `${mm}-${dd}-${yyyy} at ${hour}:${minutes}`);

        await client.updateGuild(interaction.guild, {whitelist_active: guilddata.whitelist_active + 1});

        let embed = new MessageEmbed()
            .setColor(EMBED_GENERAL)
            .setTitle(`Public Whitelist: ${nameWL}`)
            .setThumbnail(res)
            .setDescription(`${descriptionWL}`)
            .addFields(
                {name: `Required Rôle:`, value: `${requiredRole ? requiredRole : 'None Required'}`, inline: true},
                {name: `Whitelist Rôle:`, value: `${whitelistRole ? whitelistRole : 'None Required'}`, inline: true},
                {name: `Blockchain:`, value: `${blockchain}`, inline: true},
            )
            .setFooter({text: `Whitelist ID : ${guilddata.whitelist_active +1}`,
                iconURL: interaction.client.user.displayAvatarURL({dynamic: true, format: "png"})});

        let buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(`submit:${guilddata.whitelist_active +1}`)
                    .setLabel("Submit/Resubmit")
                    .setStyle("PRIMARY")
            )
            .addComponents(
                new MessageButton()
                    .setCustomId(`checkSubmission:${guilddata.whitelist_active +1}`)
                    .setLabel("Check Submission")
                    .setStyle("SECONDARY")
            )
        await interaction.reply({content: `**Whitelist successfully creates**`, ephemeral: true})
        return interaction.channel.send({embeds: [embed], components: [buttons]});

    });

};
exports.execute = execute;
exports.slash = {
    data: {
        name: "create",
        description: "Create a new whitelist",
        category: "Administrator",
        permissions: ['ADMINISTRATOR'],
        options: [
            {
                name: "name",
                description: "name of the whitelist",
                type: "STRING",
                required: true
            },
            {
                name: "description",
                description: "description of the whitelist",
                type: "STRING",
                required: true
            },
            {
                name: "picture",
                description: "picture of the whitelist",
                type: "STRING",
                required: true
            },
            {
                name: "blockchain",
                description: "The crypto to choose",
                type: "STRING",
                required: true,
                choices: [
                    {name: "ETH", value: "ETH"},
                    {name: "SOLANA", value: "SOLANA"}
                ]
            },
            {
                name: "requiredrole",
                description: `The role required to submit a whitelist`,
                type: "ROLE",
            },
            {
                name: "whitelistrole",
                description: "The role to give to the member",
                type: "ROLE",
            }

        ]
    }
};
