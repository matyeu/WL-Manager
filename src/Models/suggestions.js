const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
    id: {type: String, default: ""},
    id_serveur: {type: String, default: ""},
    id_user: {type: String, default: ""},
    title: {type: String, default: ""},
    description: {type: String, default: ""},
});

module.exports = mongoose.model('Suggestions', suggestionSchema);