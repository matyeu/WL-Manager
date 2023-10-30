const mongoose = require('mongoose');

const whitelistSchema = mongoose.Schema({
    id_serveur: {type: String, default: ""},
    id: {type: String, default: ""},
    name: {type: String, default: ""},
    description: {type: String, default: ""},
    picture: {type: String, default: ""},
    blockchain: {type: String, default: false},
    required_role: {type: String, default: null},
    whitelist_role: {type: String, default: null},
    date: {type: String, default: ""},
    members: {type: Array, default: []},
});

module.exports = mongoose.model('Whitelist', whitelistSchema);