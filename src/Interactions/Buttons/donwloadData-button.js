const {Parser} = require('json2csv');
const fs = require("fs");

async function execute(client, interaction) {

    let idWhitelist = interaction.customId.split(':')[1];
    let addressWl = await client.getAdressWl(interaction.guild, idWhitelist);

    if (addressWl < 1) return interaction.reply({content: `**The whitelist has no address**`, ephemeral: true});

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

    await interaction.reply({content: `**Sucess ! Data for whitelist ${idWhitelist} is attached.**`, files: [filepath], ephemeral: true});
    return fs.unlink(filepath, function (err) {
        if (err) console.error(err);
    });

};
exports.execute = execute;
exports.button = {
    data: {
        name: "downloadData",
    }
};