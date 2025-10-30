const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        set: v => v.replace(/\b\w/g, l => l.toUpperCase()) // Capitaliza cada palabra
    },
    bio: { 
        type: String, 
        trim: true,
        set: v => v.charAt(0).toUpperCase() + v.slice(1) // Primera letra mayúscula
    },
    image: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Artist', ArtistSchema);
