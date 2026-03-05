const express = require('express');
const router = express.Router();
const Prenotazione = require('../models/Prenotazione');

router.get('/verifica-prenotazione', async (req, res) => {
  const { codice } = req.query;
  try {
    const pren = await Prenotazione.findOne({ codicePrenotazione: codice })
      .populate('campo', 'nome tipo');
    
    if (!pren) return res.status(404).json({ msg: "Codice non trovato" });
    
    res.json({
      data: pren.data,
      orario: `${pren.oraInizio} - ${pren.oraFine}`,
      campo: pren.campo.nome,
      stato: pren.stato
    });
  } catch (err) {
    res.status(500).send("Errore server");
  }
});

module.exports = router;