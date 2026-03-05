const mongoose = require('mongoose');

const campoSportivoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { 
    type: String, 
    enum: ['tennis', 'padel', 'calcetto'], 
    required: true 
  },
  coperto: { type: Boolean, default: false },
  prezzoOrario: { type: Number, required: true },
  attivo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CampoSportivo', campoSportivoSchema);