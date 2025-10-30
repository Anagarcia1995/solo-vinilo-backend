const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Email ya registrado' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ 
            username, 
            email, 
            password: hashedPassword,
            role: req.body.role || 'user'
        });
        await user.save();

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.json({ token, user: { id: user._id, username, email, role: user.role } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2d' });

        res.json({ token, user: { id: user._id, username: user.username, email, role: user.role } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};
