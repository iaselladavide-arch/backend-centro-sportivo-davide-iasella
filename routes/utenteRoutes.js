const express = require('express');
const router = express.Router();
const Operatore = require('../models/Operatore');
const { auth, admin } = require('../middleware/auth');

//GET
router.get('/', [auth, admin], async (req, res) => {
  try {
    const utenti = await Operatore.find().select('-passwordHash');
    res.json(utenti);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

//POST
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    if (!password) return res.status(400).json({ error: "La password è obbligatoria" });
    
    const nuovo = new Operatore({ email, passwordHash: password, isAdmin });
    await nuovo.save();
    res.status(201).json({ message: "Utente creato con successo" });
  } catch (err) { res.status(400).json({ error: "Email già esistente o dati non validi" }); }
});

// DELETE
router.delete('/:id', [auth, admin], async (req, res) => {
  await Operatore.findByIdAndDelete(req.params.id);
  res.json({ message: "Utente eliminato" });
});

module.exports = router;