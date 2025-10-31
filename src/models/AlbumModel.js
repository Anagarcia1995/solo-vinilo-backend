const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    spotifyId: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    image: { type: String, trim: true }, // Portada del álbum
    genre: { type: String, trim: true },
    releaseYear: { type: Number },
    price: { type: Number, required: true },
    tracks: [{
        title: { type: String, trim: true },
        spotifyId: { type: String, required: true },
        duration_ms: { type: Number },
        preview_url: { type: String, trim: true },
        price: { type: Number }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);
