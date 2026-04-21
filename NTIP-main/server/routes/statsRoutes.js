// routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, statsController.getStats);

module.exports = router;