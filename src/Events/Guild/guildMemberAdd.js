async function execute(client, newMember) {
    await client.createUser(newMember.guild, newMember);
};
exports.execute = execute;