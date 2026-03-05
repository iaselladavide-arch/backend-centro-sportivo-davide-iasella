const express = require('express');
const router = express.Router();
const Operatore = require('../models/Operatore');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// CRUD Operatori protetto da auth E admin
router.get('/', [auth, admin], async (req, res) => {
  const operatori = await Operatore.find().select('-passwordHash');
  res.json(operatori);
});

router.post('/', [auth, admin], async (req, res) => {
  // Logica per creare un nuovo operatore dallo staff
  const nuovo = new Operatore(req.body);
  await nuovo.save();
  res.status(201).json(nuovo);
});

module.exports = router;