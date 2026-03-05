module.exports = function (req, res, next) {
  // Questo middleware deve essere usato DOPO auth.js
  // Verifica se l'operatore ha il flag Admin impostato a true
  if (!req.operatore.isAdmin) {
    return res.status(403).json({ msg: 'Accesso negato: permessi admin necessari.' });
  }
  next();
};