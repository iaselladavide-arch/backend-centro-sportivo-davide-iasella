const express = require('express');
const router = express.Router();
const Consegna = require('../models/Consegna');

//GET
router.get('/tracking', async (req, res) => {
  try {
    const { chiaveConsegna, dataRitiro } = req.query;

    if (!chiaveConsegna || !dataRitiro) {
      return res.status(400).json({ error: "Parametri mancanti" });
    }

    const consegna = await Consegna.findOne({ 
      chiaveConsegna: chiaveConsegna, 
      dataRitiro: dataRitiro 
    });

    if (!consegna) {
      return res.status(404).json({ message: "Consegna non trovata" });
    }

    res.json({
      stato: consegna.stato,
      dataRitiro: consegna.dataRitiro,
      dataConsegna: consegna.dataConsegna
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;