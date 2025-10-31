const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authMiddleware, roleCheck } = require('../middlewares/authMiddleware');

// CRUD completo de usuarios
router.get('/', authMiddleware, roleCheck('admin'), usersController.getAllUsers);
router.get('/:id', authMiddleware, usersController.getUserById);
router.put('/:id', authMiddleware, roleCheck('admin'), usersController.updateUser);
router.delete('/:id', authMiddleware, roleCheck('admin'), usersController.deleteUser);

module.exports = router;
