const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nominativo: { type: String, required: true },
  via: { type: String },
  comune: { type: String },
  provincia: { type: String },
  telefono: { type: String },
  email: { type: String },
  note: { type: String }
});

module.exports = mongoose.model('Cliente', ClienteSchema);