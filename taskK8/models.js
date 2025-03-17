const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    platform: { type: String, required: true },
    condition: { type: String, required: true },
    releaseYear: { type: Number, required: true }
});

module.exports = mongoose.model('Game', GameSchema);
