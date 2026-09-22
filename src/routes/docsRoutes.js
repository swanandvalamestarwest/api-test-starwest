const express = require('express');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();
const swaggerDocument = YAML.load(path.join(__dirname, '..', '..', 'swagger.yaml'));

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
