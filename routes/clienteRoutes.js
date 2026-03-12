const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Consegna = require('../models/Consegna');
const { auth } = require('../middleware/auth');

//Lista tutti i clienti
router.get('/', auth, async (req, res) => {
  try {
    const clienti = await Cliente.find();
    res.json(clienti);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

//Crea nuovo cliente
router.post('/', auth, async (req, res) => {
  try {
    const nuovo = new Cliente(req.body);
    await nuovo.save();
    res.status(201).json(nuovo);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

//Cancellazione con vincolo di integrità
router.delete('/:id', auth, async (req, res) => {
  try {
    const haConsegne = await Consegna.findOne({ cliente: req.params.id });
    
    if (haConsegne) {
      return res.status(400).json({ 
        error: "Vincolo di integrità: Impossibile eliminare un cliente con consegne associate." 
      });
    }

    const eliminato = await Cliente.findByIdAndDelete(req.params.id);
    if (!eliminato) return res.status(404).json({ error: "Cliente non trovato" });
    
    res.json({ message: "Cliente eliminato con successo" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

//Modifica cliente
router.put('/:id', auth, async (req, res) => {
  try {
    const aggiornato = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(aggiornato);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;