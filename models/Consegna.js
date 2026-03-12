const mongoose = require('mongoose');

const ConsegnaSchema = new mongoose.Schema({
  cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cliente', 
    required: true 
  },
  dataRitiro: { 
    type: String, 
    required: true 
  }, // Formato YYYY-MM-DD
  dataConsegna: { 
    type: String 
  }, // Formato YYYY-MM-DD
  stato: { 
    type: String, 
    enum: ['da ritirare', 'in deposito', 'in consegna', 'consegnato', 'in giacenza'], 
    default: 'da ritirare' 
  },
  chiaveConsegna: { 
    type: String, 
    required: true, 
    unique: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Consegna', ConsegnaSchema);