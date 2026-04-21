const BabyLog = require('../models/babyLogModel');

const babyLogController = {
  getAllBabyLogs: (req, res) => {
    const userId = req.user.id;
    BabyLog.getAll(userId, (err, babyLogs) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching baby logs.' });
      }
      res.json(babyLogs);
    });
  },

  getBabyLogById: (req, res) => {
    const babyLogId = req.params.id;
    const userId = req.user.id;
    BabyLog.getById(babyLogId, userId, (err, babyLog) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching baby log from the database.' });
      }
      if (!babyLog) {
        return res.status(404).json({ error: 'Baby log not found' });
      }
      res.json(babyLog);
    });
  },

  createBabyLog: (req, res) => {
    const newBabyLog = { ...req.body, userId: req.user.id };
    BabyLog.create(newBabyLog, (err, createdBabyLog) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding baby log to the database.' });
      }
      res.status(201).json(createdBabyLog);
    });
  },

  updateBabyLog: (req, res) => {
    const babyLogId = req.params.id;
    const userId = req.user.id;
    const updatedBabyLog = req.body;
    BabyLog.update(babyLogId, userId, updatedBabyLog, (err, updated) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating baby log in the database.' });
      }
      if (!updated) {
        return res.status(404).json({ error: 'Baby log not found' });
      }
      res.json(updated);
    });
  },

  deleteBabyLog: (req, res) => {
    const babyLogId = req.params.id;
    const userId = req.user.id;
    BabyLog.delete(babyLogId, userId, (err, deletedBabyLog) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting baby log from the database.' });
      }
      if (!deletedBabyLog) {
        return res.status(404).json({ error: 'Baby log not found' });
      }
      res.json(deletedBabyLog);
    });
  },
};

module.exports = babyLogController;