const roleCheckMiddleware = (requiredRole) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: 'No autorizado' });
    if (req.user.role !== requiredRole) {
        return res.status(403).json({ msg: 'Acceso denegado' });
    }
    next();
};

module.exports = roleCheckMiddleware;