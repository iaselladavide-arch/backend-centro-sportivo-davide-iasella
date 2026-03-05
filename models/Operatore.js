const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const operatoreSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

// Middleware Mongoose: Hash della password prima del salvataggio
// Rimosso 'next' perché usiamo async/await
operatoreSchema.pre('save', async function() {
  // Se la password non è stata modificata, non fare nulla
  if (!this.isModified('passwordHash')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  } catch (err) {
    // In caso di errore, Mongoose lo catturerà
    throw err;
  }
});

// Metodo per confrontare le password durante il login
operatoreSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('Operatore', operatoreSchema);