const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true,
        set: v => v.replace(/\b\w/g, l => l.toUpperCase()) // Capitaliza cada palabra
    },
    artist: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Artist', 
        required: true 
    },
    image: { type: String, trim: true }, 
    year: { type: Number },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);
