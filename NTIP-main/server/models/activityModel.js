const db = require('../db/database');

class Activity {
  static getAllActivities(userId, callback) {
    db.all('SELECT * FROM activities WHERE user_id = ? ORDER BY activity_time ASC', [userId], callback);
  }

  static createActivity(userId, activity, callback) {
    const { activityType, title, notes, activityTime } = activity;
    db.run(
      'INSERT INTO activities (user_id, activity_type, title, notes, activity_time) VALUES (?, ?, ?, ?, ?)',
      [userId, activityType, title, notes, activityTime],
      callback
    );
  }
}

module.exports = Activity;