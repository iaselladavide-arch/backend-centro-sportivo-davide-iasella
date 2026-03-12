module.exports = function (req, res, next) {
  if (!req.operatore.isAdmin) {
    return res.status(403).json({ msg: 'Accesso negato: permessi admin necessari.' });
  }
  next();
};