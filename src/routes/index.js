const express = require('express');
const authRoutes = require('./authRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const healthRoutes = require('./healthRoutes');

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api', checkoutRoutes);
router.use('/api', healthRoutes);

module.exports = router;
