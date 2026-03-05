require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connessione al Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Permette di leggere i dati JSON inviati nel body

app.post('/test', (req, res) => {
  console.log("Corpo ricevuto nel test diretto:", req.body);
  res.json({ ricevuto: req.body });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clienti', require('./routes/clienteRoutes'));
app.use('/api/campi', require('./routes/campoRoutes'));
app.use('/api/prenotazioni', require('./routes/prenotazioneRoutes'));
app.use('/api/operatori', require('./routes/operatoreRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server in esecuzione sulla porta ${PORT}`));