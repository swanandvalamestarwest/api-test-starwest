const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userModel = require('../models/userModel');

class AuthError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

function register({ name, email, password }) {
  if (!name || !email || !password) {
    throw new AuthError('name, email and password are required', 400);
  }

  if (userModel.findByEmail(email)) {
    throw new AuthError('A user with this email already exists', 409);
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = userModel.create({ name, email, password: hashedPassword });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function login({ email, password }) {
  if (!email || !password) {
    throw new AuthError('email and password are required', 400);
  }

  const user = userModel.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AuthError('Invalid email or password', 401);
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

module.exports = {
  AuthError,
  register,
  login,
};
