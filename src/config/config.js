const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'ecommerce-dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

module.exports = config;
