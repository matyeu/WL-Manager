const mongoose = require('mongoose');

const bugSchema = mongoose.Schema({
    id: {type: String, default: ""},
    id_serveur: {type: String, default: ""},
    id_user: {type: String, default: ""},
    title: {type: String, default: ""},
    description: {type: String, default: ""},
});

module.exports = mongoose.model('Bugs', bugSchema);