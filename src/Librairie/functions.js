const { Client, Guild, User, Adresse, Whitelist, Suggestion, Bug } = require('../models');
const Logger = require("./logger");

module.exports = client => {
    client.getClient = async _ => {
        const clientData = await Client.findOne();
        return clientData;
    };

    client.createClient = async _ => {
        const clientData = new Client();
        await clientData.save();
    };

    client.updateClient = async (settings) => {
        let clientData = await client.getClient();
        if (typeof clientData != 'object') clientData = {};
        for (const key in settings) {
            if (clientData[key] != settings[key]) clientData[key] = settings[key]
        }
        return clientData.updateOne(settings);
    };

    client.getUser = async (guild, user) => {
        const userData = await User.findOne({ id_serveur: guild.id, id: user.id, name: user.user.username });
        return userData;
    };

    client.getGuild = async guild => {
        const guildData = await Guild.findOne({ id: guild.id });
        return guildData;
    };

    client.createGuild = async guild => {
        const createGuild = new Guild({ id: guild.id, name: guild.name });
        createGuild.save().then(_ => Logger.client(`Nouveau serveur -> ${guild.name} (${guild.id})`));
    };

    client.updateGuild = async (guild, settings) => {
        let guildData = await client.getGuild(guild);
        if (typeof guildData != 'object') guildData = {};
        for (const key in settings) {
            if (guildData[key] != settings[key]) guildData[key] = settings[key]
        }
        return guildData.updateOne(settings);
    };

    client.getUser = async (guild, user) => {
        const userData = await User.findOne({ id_serveur: guild.id, id: user.id, name: user.user.username });
        return userData;
    };

    client.createUser = async (guild, user) => {
        const userData = new User({ id_serveur: guild.id, id: user.id, name: user.user.username });
        userData.save().then(_ => Logger.client(`Nouveau membre -> ${user.user.username} (${user.id})`));
    };

    client.updateUser = async (guild, user, settings) => {
        let userData = await client.getUser(guild, user);
        if (typeof userData != 'object') userData = {};
        for (const key in settings) {
            if (userData[key] != settings[key]) userData[key] = settings[key]
        }
        return userData.updateOne(settings);
    };

    client.getWhitelist = async (guild, id_whitelist) => {
        const whitelistData = await Whitelist.findOne({ id_serveur: guild.id, id: id_whitelist });
        return whitelistData;
    };

    client.getWlServer = async (guild) => {
        const whitelistData = await Whitelist.find({ id_serveur: guild.id });
        if (whitelistData) return whitelistData;
    }

    client.createWhitelist = async (guild, id, name, description, picture, blockhain, requiredRole, whitelistRole, date) => {
        const whitelistData = new Whitelist({ id_serveur: guild.id, id: id, name: name, description:
            description, picture: picture, blockchain: blockhain, required_role: requiredRole, whitelist_role: whitelistRole, date: date });
        whitelistData.save().then(g => Logger.client(`Nouvelle whitelist ajoutée !`));
    };

    client.updateWhitelist = async (guild, id, settings) => {
        let whitelistData = await client.getWhitelist(guild, id);
        if (typeof whitelistData != 'object') whitelistData = {};
        for (const key in settings) {
            if (whitelistData[key] != settings[key]) whitelistData[key] = settings[key]
        }
        return whitelistData.updateOne(settings);
    };

    client.getAddress = async (guild, id_whitelist, user) => {
        const addressData = await Adresse.findOne({ id_serveur: guild.id, id_whitelist: id_whitelist, id_user: user.id });
        return addressData;
    };

    client.getAddressUser = async (guild, user) => {
        const addressData = await Adresse.find({ id_serveur: guild.id, id_user: user.id });
        return addressData;
    };

    client.getAdressWl = async (guild, id_whitelist) => {
        const addressData = await Adresse.find({ id_serveur: guild.id, id_whitelist: id_whitelist });
        if (addressData) return addressData;
    };

    client.createAddress = async (guild, id_whitelist, user, address) => {
        const addressData = new Adresse({ id_serveur: guild.id, id_whitelist: id_whitelist, id_user: user.id, adresse: address });
        addressData.save().then(g => Logger.client(`Nouvelle adresse ajoutée !`));
    };

    client.updateAddress = async (guild, id_whitelist, user, settings) => {
        let addressData = await client.getAddress(guild, id_whitelist, user);
        if (typeof addressData != 'object') addressData = {};
        for (const key in settings) {
            if (addressData[key] != settings[key]) addressData[key] = settings[key]
        }
        return addressData.updateOne(settings);
    };

    client.getSuggestionServer = async (guild, id) => {
        const suggestionData = await Suggestion.findOne({ id_serveur: guild.id, id: id });
        return suggestionData;
    };

    client.getSuggestion = async () => {
        const suggestionData = await Suggestion.find();
        if (suggestionData) return suggestionData;
    }

    client.createSuggestion = async (guild, id, user, title, description) => {
        const suggestionData = new Suggestion({ id_serveur: guild.id, id: id, user: user.id, title: title, description: description});
        suggestionData.save().then(g => Logger.client(`Nouvelle suggestion ajoutée !`));
    };

    client.updateSuggestionServer = async (guild, id, settings) => {
        let suggestionData = await client.getSuggestionServer(guild, id);
        if (typeof suggestionData != 'object') suggestionData = {};
        for (const key in settings) {
            if (suggestionData[key] != settings[key]) suggestionData[key] = settings[key]
        }
        return suggestionData.updateOne(settings);
    };

    client.updateBug = async (id, settings) => {
        let suggestionData = await client.getSuggestion(id);
        if (typeof suggestionData != 'object') suggestionData = {};
        for (const key in settings) {
            if (suggestionData[key] != settings[key]) suggestionData[key] = settings[key]
        }
        return suggestionData.updateOne(settings);
    };

    client.getBugServer = async (guild, id) => {
        const bugData = await Bug.findOne({ id_serveur: guild.id, id: id });
        return bugData;
    };

    client.getBug = async () => {
        const bugData = await Bug.find();
        if (bugData) return bugData;
    }

    client.createBug = async (guild, id, user, title, description) => {
        const bugData = new Bug({ id_serveur: guild.id, id: id, user: user.id, title: title, description: description});
        bugData.save().then(g => Logger.client(`Nouveau bug ajouté !`));
    };

    client.updateBugServer = async (guild, id, settings) => {
        let bugData = await client.getBugServer(guild, id);
        if (typeof bugData != 'object') bugData = {};
        for (const key in settings) {
            if (bugData[key] != settings[key]) bugData[key] = settings[key]
        }
        return bugData.updateOne(settings);
    };

    client.updateBug = async (id, settings) => {
        let bugData = await client.getBug(id);
        if (typeof bugData != 'object') bugData = {};
        for (const key in settings) {
            if (bugData[key] != settings[key]) bugData[key] = settings[key]
        }
        return bugData.updateOne(settings);
    };
}