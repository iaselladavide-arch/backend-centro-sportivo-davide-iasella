const express = require('express');
const router = express.Router();
const Consegna = require('../models/Consegna'); 
const { auth } = require('../middleware/auth');

//GET
router.get('/', auth, async (req, res) => {
  try {
    const { cliente, stato } = req.query;
    let query = {};

    if (cliente && cliente !== "") query.cliente = cliente;
    if (stato && stato !== "") query.stato = stato;

    const consegne = await Consegna.find(query).populate('cliente');
    res.json(consegne);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { stato, dataConsegna } = req.body;
    
    const consegnaAggiornata = await Consegna.findByIdAndUpdate(
      req.params.id,
      { stato, dataConsegna },
      { new: true }
    ).populate('cliente');

    if (!consegnaAggiornata) return res.status(404).json({ error: "Consegna non trovata" });

    res.json(consegnaAggiornata);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//POST
router.post('/', auth, async (req, res) => {
  try {
    const nuova = new Consegna(req.body);
    await nuova.save();
    res.status(201).json(nuova);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const eliminata = await Consegna.findByIdAndDelete(req.params.id);
    
    if (!eliminata) {
      return res.status(404).json({ error: "Consegna non trovata" });
    }

    res.json({ message: "Consegna eliminata con successo" });
  } catch (err) {
    res.status(500).json({ error: "Errore durante l'eliminazione: " + err.message });
  }
});

module.exports = router;