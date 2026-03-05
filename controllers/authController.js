const Operatore = require('../models/Operatore');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Cerca l'operatore
    const operatore = await Operatore.findOne({ email });
    if (!operatore) return res.status(400).json({ msg: 'Credenziali non valide' });

    // 2. Verifica password
    const isMatch = await operatore.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenziali non valide' });

    // 3. Crea il Token JWT
    const payload = { 
      id: operatore._id, 
      isAdmin: operatore.isAdmin 
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({
      token,
      operatore: {
        id: operatore._id,
        nome: operatore.nome,
        isAdmin: operatore.isAdmin
      }
    });
  } catch (err) {
    res.status(500).send('Errore del server');
  }
};