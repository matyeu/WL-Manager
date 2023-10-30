const mongoose = require('mongoose');

const adresseSchema = mongoose.Schema({
    id_serveur: {type: String, default: ""},
    id_whitelist: {type: String, default: ""},
    id_user: {type: String, default: ""},
    adresse: {type: String, default: ""},
});

module.exports = mongoose.model('Adresses', adresseSchema);