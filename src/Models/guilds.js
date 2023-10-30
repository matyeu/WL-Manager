const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: {type: String, default: ""},
    name: {type: String, default: ""},
    whitelist_active: {type: Number, default: 0},
    premium: {type: Boolean, default: false},
    bugs: {type: Number, default: 0},
});

module.exports = mongoose.model('Guilds', guildSchema);