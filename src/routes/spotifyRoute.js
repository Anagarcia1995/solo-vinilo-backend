const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

// Traer todos los álbumes (frontend decide cuántos mostrar)
router.get('/albums', spotifyController.getAllAlbums);

// Buscar artista por nombre
router.get('/artist/search', spotifyController.searchArtist);

// Álbumes de un artista
router.get('/artist/:id/albums', spotifyController.getArtistAlbums);

// Tracks de un álbum
router.get('/album/:id/tracks', spotifyController.getAlbumTracks);

module.exports = router;
