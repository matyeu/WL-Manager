const {MessageEmbed} = require("discord.js");
const {EMBED_INFO} = require("../../config");

async function execute(client, interaction) {

    let idWhitelist = interaction.options.getNumber('id');
    let user = interaction.options.getString('user');
    let address = interaction.options.getString('address');
    let getSubcommand = interaction.options.getSubcommand(false)

    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);

    if (!whiteListData) return interaction.reply({content: `**Whitelist not found**`, ephemeral: true});
    let members = whiteListData.members;

    const userMention = user.replace("<@!", "").replace(">", "")
    const userToMention = interaction.guild?.members.cache.get(userMention.replace(/ /g,""));

    if (!userToMention) return interaction.reply({content: `**User not found**`, ephemeral: true});

    let adressData = await client.getAddress(interaction.guild, idWhitelist, userToMention);

    if ((getSubcommand === "removeuser" || getSubcommand === "user") && !adressData)
        return interaction.reply({content: `**User ${userToMention.user.tag} not found in whitelist**`, ephemeral: true});

    switch (getSubcommand) {
        case 'adduser':
            if (adressData) return interaction.reply({content: `**User ${userToMention.user.tag} already has an address**`, ephemeral: true});
            members.push(userToMention.user.id);
            await client.updateWhitelist(interaction.guild, idWhitelist, {members: members});
            await client.createAddress(interaction.guild, idWhitelist, userToMention.user, address);
            return interaction.reply({content: `**User ${userToMention.user.tag} successfully added to whitelist**`, ephemeral: true});
            break;
        case 'removeuser':
            members.splice(members.indexOf(userToMention.user.id), 1);
            await client.updateWhitelist(interaction.guild, idWhitelist, {members: members});
            await adressData.delete();
            return interaction.reply({content: `**User ${userToMention.user.tag} successfully removed from whitelist**`, ephemeral: true});
            break;
        case 'user':
            let embed = new MessageEmbed()
                .setColor(EMBED_INFO)
                .setTitle(`Whitelist ${whiteListData.name}`)
                .setDescription(`**User:** ${userToMention.user.tag}\n**Address:** \`${adressData.adresse}\``)
            return interaction.reply({embeds: [embed], ephemeral: true});
            break;
        default: return interaction.reply({content: `**Invalid subcommand**`, ephemeral: true});

    };


};
exports.execute = execute;
exports.slash = {
    data: {
        name: "whitelist",
        description: "Add or remove a member's entry in a whitelist\n",
        category: "Administrator",
        permissions: ['ADMINISTRATOR'],
        options: [
            {
                name: "adduser",
                description: "Add a user to a whitelist",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "id",
                        description: "id of the whitelist",
                        type: "NUMBER",
                        required: true
                    },
                    {
                        name: "user",
                        description: "id or mention of the user",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "address",
                        description: "address of the user",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "removeuser",
                description: "Remove a user to a whitelist",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "id",
                        description: "id of the whitelist",
                        type: "NUMBER",
                        required: true
                    },
                    {
                        name: "user",
                        description: "id or mention of the user",
                        type: "STRING",
                        required: true
                    },
                ]
            },
            {
                name: "user",
                description: "Add a user to a whitelist",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "id",
                        description: "id of the whitelist",
                        type: "NUMBER",
                        required: true
                    },
                    {
                        name: "user",
                        description: "id or mention of the user",
                        type: "STRING",
                        required: true
                    },
                ]
            },

        ]
    }
};
