const express = require('express');
const routes = require('./routes');
const docsRoutes = require('./routes/docsRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/api-docs', docsRoutes);
app.use(routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
