const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true,
        set: v => v.replace(/\b\w/g, l => l.toUpperCase()) // Primera letra mayúscula
    },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },        
    role: { type: String, enum: ['user', 'admin'], default:'user' },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }],
    createdAt: { type: Date, default: Date.now }   
});

module.exports = mongoose.model('User', UserSchema);
