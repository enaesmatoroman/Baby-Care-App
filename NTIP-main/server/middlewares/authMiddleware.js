// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); // Your secret key

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  // 🔥 OVDJE JE KLJUČNA PROMJENA
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
