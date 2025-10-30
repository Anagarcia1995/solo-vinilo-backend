const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Middleware para verificar token
exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No autorizado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token inválido' });
    }
};

// Middleware para roles
exports.roleCheck = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ msg: 'Acceso denegado' });
        }
        next();
    };
};
