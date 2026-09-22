const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

router.get('/health', healthController.healthcheck);

module.exports = router;
