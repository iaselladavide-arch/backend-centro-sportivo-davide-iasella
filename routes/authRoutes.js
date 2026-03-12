const express = require('express');
const router = express.Router();
const Operatore = require('../models/Operatore');
const authController = require('../controllers/authController');

//ROTTA DI SETUP (http://localhost:5000/api/auth/setup-admin)
router.post('/setup-admin', async (req, res) => {
    console.log("Dati ricevuti:", req.body);
    try {
        const { nome, cognome, email, password } = req.body;

        const adminExists = await Operatore.findOne({ email });
        if (adminExists) return res.status(400).json({ msg: "Admin già esistente" });

        const nuovoAdmin = new Operatore({
        nome,
        cognome,
        email,
        passwordHash: password,
        isAdmin: true
        });

        await nuovoAdmin.save();
        res.status(201).json({ msg: "Admin creato con successo! Ora puoi fare il login." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//ROTTA DI LOGIN
router.post('/login', authController.login);

module.exports = router;