async function execute(client, member) {
    let userData = await client.getUser(member.guild, member);
        await client.getAddressUser(member.guild, member).then(async addressUser => {
            addressUser.forEach(async address => {
                await client.getWlServer(member.guild).then(async wlServer => {
                    wlServer.forEach(async wl => {
                        let members = wl.members;
                        members.splice(members.indexOf(member.id), 1);
                        await client.updateWhitelist(member.guild, wl.id, {members: members});
                    })
                });
                await address.delete();
            });
        });
        return userData.delete();
};
exports.execute = execute;