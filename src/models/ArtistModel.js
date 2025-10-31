const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    spotifyId: { type: String, required: true, unique: true }, // ID real de Spotify
    name: { type: String, required: true, trim: true },
    genres: [{ type: String, trim: true }],
    image: { type: String, trim: true }, // Imagen oficial de Spotify
    followers: { type: Number, default: 0 },
    popularity: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artist', ArtistSchema);
