const Album = require('../models/albumModel');


exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find().populate('artist'); // populate para traer info del artista
        res.json(albums);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


exports.getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');
        if (!album) return res.status(404).json({ msg: 'Álbum no encontrado' });
        res.json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


exports.createAlbum = async (req, res) => {
    try {
        let { title, artist, image, year, price } = req.body;

        title = title.trim().replace(/\b\w/g, l => l.toUpperCase());
        if (image) image = image.trim();

        const album = new Album({ title, artist, image, year, price });
        await album.save();
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).json({ msg: 'Álbum no encontrado' });

        if (req.body.title) album.title = req.body.title.trim().replace(/\b\w/g, l => l.toUpperCase());
        if (req.body.artist) album.artist = req.body.artist;
        if (req.body.image) album.image = req.body.image.trim();
        if (req.body.year) album.year = req.body.year;
        if (req.body.price) album.price = req.body.price;

        await album.save();
        res.json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};



exports.deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id);
        if (!album) return res.status(404).json({ msg: 'Álbum no encontrado' });
        res.json({ msg: 'Álbum eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};
