const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const upload = require('../middlewares/upload');


router.get('/', artistController.getAllArtist);
router.get('/:id', artistController.getArtistById);
router.post('/', upload.single('image'), artistController.createArtist); // subir imagen
router.put('/:id', upload.single('image'), artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);

module.exports = router;