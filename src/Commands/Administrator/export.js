const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const {EMBED_GENERAL} = require("../../config");
const {Parser} = require("json2csv");
const fs = require("fs");

async function execute(client, interaction) {
    let idWhitelist = interaction.options.getNumber('id');
    let whiteListData = await client.getWhitelist(interaction.guild, idWhitelist);

    if (!whiteListData) return interaction.reply({content: `**Whitelist not found**`, ephemeral: true});

    let filepath = `src/${interaction.guild.id}.csv`
    let fields = [];
    let csv;

    await client.getAdressWl(interaction.guild, idWhitelist).then(async wlAddress => {
        wlAddress.forEach(async address => {
            let member = await interaction.guild.members.fetch(address.id_user);
            fields = [`${member.user.tag} (${member.user.id}) : ${address.adresse}`];
            const opts = {fields};
            try {
                const parser = new Parser(opts);
                csv = parser.parse();
            } catch (err) {
                console.error(err);
            }
            await fs.appendFile(filepath, `${csv}\n`, function (err) {
                if (err) throw err;
            });

        });
    });

    await interaction.reply({content: `**Sucess ! Data for whitelist ${whiteListData.id} is attached.**`, files: [filepath], ephemeral: true});
    return fs.unlink(filepath, function (err) {
        if (err) console.error(err);
    });

};
exports.execute = execute;
exports.slash = {
    data: {
        name: "export",
        description: "Export a whitelist",
        category: "Administrator",
        permissions: ['ADMINISTRATOR'],
        options: [
            {
                name: "id",
                description: "id of the whitelist",
                type: "NUMBER",
                required: true
            },
        ]
    }
};
