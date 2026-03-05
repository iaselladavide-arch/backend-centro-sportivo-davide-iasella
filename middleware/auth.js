const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Prendi il token dall'header della richiesta
  const token = req.header('x-auth-token');

  // 2. Controlla se il token esiste
  if (!token) {
    return res.status(401).json({ msg: 'Nessun token, autorizzazione negata.' });
  }

  try {
    // 3. Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Aggiunge i dati dell'operatore (ID e Admin status) alla richiesta
    req.operatore = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Il token non è valido.' });
  }
};