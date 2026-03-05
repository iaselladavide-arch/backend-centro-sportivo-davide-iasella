const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  note: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);