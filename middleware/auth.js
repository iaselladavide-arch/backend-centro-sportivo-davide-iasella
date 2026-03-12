const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: "Accesso negato. Token mancante." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Token non valido." });
  }
};

const admin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Accesso negato. Richiesti permessi Admin." });
  next();
};

module.exports = { auth, admin };