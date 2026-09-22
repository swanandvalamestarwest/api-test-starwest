function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message || 'Internal Server Error' });
}

module.exports = { notFound, errorHandler };
