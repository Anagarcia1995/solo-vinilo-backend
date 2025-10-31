const SPOTIFY_TOKEN = process.env.SPOTIFY_TOKEN; // guardado en tu .env

async function fetchSpotify(endpoint) {
  const res = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      Authorization: `Bearer ${SPOTIFY_TOKEN}`
    }
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error en Spotify API: ${res.status} - ${error}`);
  }

  return await res.json();
}

module.exports = fetchSpotify;
