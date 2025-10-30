const Artist = require('../models/artistModel');

exports.getAllArtists = async (req,res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


exports.getAllArtist = async (req,res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


exports.getArtistById = async (req,res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ msg: 'Artista no encontrado' });
        res.json(artist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


exports.createArtist = async (req, res) => {
    try {
        let { name, bio, image } = req.body;

        // Capitaliza y trim
        name = name.trim().replace(/\b\w/g, l => l.toUpperCase());
        if (bio) bio = bio.trim().charAt(0).toUpperCase() + bio.slice(1);
        if (image) image = image.trim();

        const artist = new Artist({ name, bio, image });
        await artist.save();
        res.status(201).json(artist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ msg: 'Artista no encontrado' });

        if (req.body.name) artist.name = req.body.name.trim().replace(/\b\w/g, l => l.toUpperCase());
        if (req.body.bio) artist.bio = req.body.bio.trim().charAt(0).toUpperCase() + req.body.bio.slice(1);
        if (req.body.image) artist.image = req.body.image.trim();

        await artist.save();
        res.json(artist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


exports.deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) return res.status(404).json({ msg: 'Artista no encontrado' });
        res.json({ msg: 'Artista eliminado correctamente'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor'});
    }
};