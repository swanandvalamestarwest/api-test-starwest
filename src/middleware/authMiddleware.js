const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userModel = require('../models/userModel');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = userModel.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    req.user = { id: user.id, name: user.name, email: user.email };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authenticate;
