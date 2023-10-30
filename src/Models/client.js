const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    suggestions: {type: Number, default: 0},
    bugs: {type: Number, default: 0},
});

module.exports = mongoose.model('Client', clientSchema);