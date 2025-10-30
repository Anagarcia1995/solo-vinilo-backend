const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

// Listar todos los usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // no devolver password
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

// Ver un usuario específico
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

        if (username) user.username = username.trim().replace(/\b\w/g, l => l.toUpperCase());
        if (email) user.email = email.trim();
        if (role) user.role = role;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ msg: 'Usuario actualizado', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


// Eliminar usuario (solo admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

        res.json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

