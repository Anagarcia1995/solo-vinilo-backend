const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const upload = require('../middlewares/upload');

// CRUD Albums
router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbumById);
router.post('/', upload.single('image'), albumController.createAlbum); // subir imagen
router.put('/:id', upload.single('image'), albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;
