Solo Vinilo Backend
Descripción

Backend de la aplicación Solo Vinilo.
Proporciona endpoints para gestionar usuarios, autenticación, artistas, álbumes y conexión con la API de Spotify.

Tecnologías

Node.js / Express

MongoDB / Mongoose

JWT para autenticación

bcrypt para hashing de contraseñas

dotenv para variables de entorno

Multer para subida de imágenes

CORS habilitado

Instalación

Clonar el repositorio:

git clone <repo-url>


Instalar dependencias:

npm install


Crear archivo .env en la raíz con las siguientes variables:

PORT=5000
MONGO_URI=<tu_mongodb_uri>
JWT_SECRET=<tu_secreto_jwt>
SPOTIFY_CLIENT_ID=<spotify_client_id>
SPOTIFY_CLIENT_SECRET=<spotify_client_secret>


Crear carpeta uploads/ para almacenar imágenes:

mkdir uploads

Ejecutar el servidor
npm run dev


Deberías ver en consola:

MongoDB connected
Server running on port 5000

Endpoints
Auth / Users

POST /api/auth/signup – Registrar usuario

POST /api/auth/login – Login usuario

GET /api/users – Listar todos los usuarios (solo admin)

GET /api/users/:id – Ver usuario por ID

PUT /api/users/:id – Actualizar usuario

DELETE /api/users/:id – Eliminar usuario

Albums

GET /api/albums – Listar todos los álbumes

GET /api/albums/:id – Ver álbum por ID

POST /api/albums – Crear álbum (con imagen)

PUT /api/albums/:id – Actualizar álbum (con imagen)

DELETE /api/albums/:id – Eliminar álbum

GET /api/albums/spotify/:spotifyId – Traer álbum desde Spotify

GET /api/albums/:id/tracks – Obtener tracks de un álbum

Artists

GET /api/artists – Listar artistas

GET /api/artists/:id – Ver artista por ID

POST /api/artists – Crear artista (con imagen)

PUT /api/artists/:id – Actualizar artista (con imagen)

DELETE /api/artists/:id – Eliminar artista

GET /api/artists/spotify/:spotifyId – Traer artista desde Spotify

GET /api/artists/search?name=<nombre> – Buscar artista por nombre

GET /api/artists/:id/albums – Traer álbumes de un artista

Spotify (integración)

GET /api/spotify/artist/search?name=<nombre> – Buscar artista

GET /api/spotify/artist/:id/albums – Álbumes de artista

GET /api/spotify/album/:id/tracks – Tracks de álbum

Notas

Todos los endpoints de usuario requieren autenticación con JWT.

Las imágenes se suben a la carpeta /uploads y se sirven estáticamente.

La paginación o límite de álbumes se controla desde el frontend (GET /api/albums devuelve todos).