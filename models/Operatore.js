const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const operatoreSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

operatoreSchema.pre('save', async function() {
  if (!this.isModified('passwordHash')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  } catch (err) {
    throw err;
  }
});

operatoreSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('Operatore', operatoreSchema);