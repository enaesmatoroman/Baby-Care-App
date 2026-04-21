const express = require('express');
const activityController = require('../controllers/activityController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticateToken); // Apply middleware to all activity routes

router.get('/', activityController.getAllActivities);
router.post('/', activityController.createActivity);
router.put('/:id', authenticateToken, activityController.updateActivity);
router.delete('/:id', authenticateToken, activityController.deleteActivity);

module.exports = router;