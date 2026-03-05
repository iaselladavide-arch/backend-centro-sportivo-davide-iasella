const Prenotazione = require('../models/Prenotazione');
const generateCode = require('../utils/generateCode');

// 1. CREA PRENOTAZIONE
exports.createPrenotazione = async (req, res) => {
  try {
    const { data, oraInizio, oraFine, campo, cliente } = req.body;

    // Controllo sovrapposizione orari sullo stesso campo
    const overlap = await Prenotazione.findOne({
      campo,
      data,
      stato: { $ne: 'annullata' },
      $and: [
        { oraInizio: { $lt: oraFine } },
        { oraFine: { $gt: oraInizio } }
      ]
    });

    if (overlap) {
      return res.status(400).json({ msg: "Il campo è già occupato in questa fascia oraria." });
    }

    const nuovaPrenotazione = new Prenotazione({
      ...req.body,
      codicePrenotazione: generateCode()
    });

    await nuovaPrenotazione.save();
    
    // Restituiamo l'oggetto popolato per comodità del frontend
    const risultato = await Prenotazione.findById(nuovaPrenotazione._id)
      .populate('cliente')
      .populate('campo');

    res.status(201).json(risultato);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. LISTA PRENOTAZIONI (con filtri)
exports.getPrenotazioni = async (req, res) => {
  try {
    const { data, campo, stato } = req.query;
    let query = {};
    
    if (data) query.data = data;
    if (campo) query.campo = campo;
    if (stato) query.stato = stato;

    const prenotazioni = await Prenotazione.find(query)
      .populate('cliente')
      .populate('campo')
      .sort({ data: 1, oraInizio: 1 });
      
    res.json(prenotazioni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. AGGIORNA PRENOTAZIONE
exports.updatePrenotazione = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Se vengono modificati orari, data o campo, verifichiamo che non ci siano conflitti
    if (updateData.data || updateData.oraInizio || updateData.oraFine || updateData.campo) {
      const attuale = await Prenotazione.findById(id);
      if (!attuale) return res.status(404).json({ msg: "Prenotazione non trovata" });

      const d = updateData.data || attuale.data;
      const inizio = updateData.oraInizio || attuale.oraInizio;
      const fine = updateData.oraFine || attuale.oraFine;
      const c = updateData.campo || attuale.campo;

      const overlap = await Prenotazione.findOne({
        _id: { $ne: id }, // Esclude se stessa dal controllo sovrapposizione
        campo: c,
        data: d,
        stato: { $ne: 'annullata' },
        $and: [
          { oraInizio: { $lt: fine } },
          { oraFine: { $gt: inizio } }
        ]
      });

      if (overlap) {
        return res.status(400).json({ msg: "Il campo risulta occupato negli orari scelti." });
      }
    }

    const aggiornata = await Prenotazione.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).populate('cliente campo');

    res.json(aggiornata);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. ELIMINA PRENOTAZIONE
exports.deletePrenotazione = async (req, res) => {
  try {
    const eliminata = await Prenotazione.findByIdAndDelete(req.params.id);
    if (!eliminata) return res.status(404).json({ msg: "Prenotazione non trovata" });
    res.json({ msg: "Prenotazione eliminata con successo" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};