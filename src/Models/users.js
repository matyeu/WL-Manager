const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id_serveur: {type: String, default: ""},
    id: {type: String, default: ""},
    name: {type: String, default: ""},
});

module.exports = mongoose.model('users', userSchema);