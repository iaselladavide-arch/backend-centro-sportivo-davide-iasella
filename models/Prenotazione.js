const mongoose = require('mongoose');

const prenotazioneSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  oraInizio: { type: String, required: true }, // Formato "HH:mm"
  oraFine: { type: String, required: true },   // Formato "HH:mm"
  stato: { 
    type: String, 
    enum: ['prenotata', 'confermata', 'annullata', 'completata'], 
    default: 'prenotata' 
  },
  codicePrenotazione: { type: String, unique: true, required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  campo: { type: mongoose.Schema.Types.ObjectId, ref: 'CampoSportivo', required: true }
});