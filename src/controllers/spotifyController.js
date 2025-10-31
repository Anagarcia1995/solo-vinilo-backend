// controllers/spotifyController.js
require('dotenv').config();

let accessToken = '';
let tokenExpiresAt = 0;

async function getSpotifyToken() {
    const now = Date.now();
    if (accessToken && now < tokenExpiresAt) return accessToken;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiresAt = now + data.expires_in * 1000;
    return accessToken;
}

async function fetchSpotify(endpoint) {
    const token = await getSpotifyToken();
    const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Spotify API error: ${res.status} - ${errorText}`);
    }
    return res.json();
}

// ==========================
// ARTISTAS
// ==========================
exports.searchArtist = async (req, res) => {
    try {
        const { name } = req.query;
        const data = await fetchSpotify(`/search?q=${encodeURIComponent(name)}&type=artist&limit=1`);
        res.json(data.artists.items[0] || {});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error conectando con Spotify' });
    }
};

exports.getArtistAlbums = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSpotify(`/artists/${id}/albums?include_groups=album,single&market=US&limit=50`);
        res.json(data.items || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error conectando con Spotify' });
    }
};

// ==========================
// ALBÚMES
// ==========================
exports.getAllAlbums = async (req, res) => {
    try {
        const data = await fetchSpotify('/browse/new-releases?limit=50'); // trae hasta 50 por default
        res.json(data.albums.items || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error conectando con Spotify' });
    }
};

exports.getAlbumTracks = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await fetchSpotify(`/albums/${id}/tracks`);
        res.json(data.items || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error conectando con Spotify' });
    }
};
