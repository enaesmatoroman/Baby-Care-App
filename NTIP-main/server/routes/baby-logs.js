const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const babyLogController = require('../controllers/babyLogController');

const router = express.Router();

router.use(authenticateToken); // Apply middleware to all routes below this line

/**
 * @swagger
 * /api/baby-logs:
 *   get:
 *     summary: Get all baby logs
 *     description: Retrieve a list of all baby logs.
 *     responses:
 *       '200':
 *         description: A successful response with the list of baby logs.
 */
router.get('/', babyLogController.getAllBabyLogs);

router.get('/:id', babyLogController.getBabyLogById);
router.post('/', babyLogController.createBabyLog);
router.put('/:id', babyLogController.updateBabyLog);
router.delete('/:id', babyLogController.deleteBabyLog);

module.exports = router;