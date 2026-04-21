const Activity = require('../models/activityModel');

const activityController = {
  getAllActivities: (req, res) => {
    const userId = req.user.id;
    Activity.getAllActivities(userId, (err, activities) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching activities.' });
      }
      res.status(200).json(activities);
    });
  },

  createActivity: (req, res) => {
    const userId = req.user.id;
    Activity.createActivity(userId, req.body, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating activity.' });
      }
      res.status(201).json({ message: 'Activity created successfully.' });
    });
  },
  updateActivity: (req, res) => {
    const id = req.params.id;
    const { activityType, title, notes, activityTime } = req.body;
  
    db.run(
      `UPDATE activities SET activity_type=?, title=?, notes=?, activity_time=? WHERE id=?`,
      [activityType, title, notes, activityTime, id],
      function (err) {
        if (err) return res.status(500).json(err);
        res.json({ message: "Updated successfully" });
      }
    );
  },
  
  deleteActivity: (req, res) => {
    const id = req.params.id;
  
    db.run(`DELETE FROM activities WHERE id=?`, [id], function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted successfully" });
    });
  }
};

module.exports = activityController;