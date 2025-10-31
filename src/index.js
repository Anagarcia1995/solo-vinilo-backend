require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Importar rutas
const authRouter = require('./routes/authRoute');
const usersRouter = require('./routes/usersRoute'); 
const spotifyRouter = require('./routes/spotifyRoute');

// Conexión a DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Montar rutas
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter); 
app.use('/api/spotify', spotifyRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
