const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connesso: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Errore connessione: ${err.message}`);
    process.exit(1); // Ferma l'app in caso di errore critico
  }
};

module.exports = connectDB;