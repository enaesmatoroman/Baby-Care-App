// controllers/statsController.js
const db = require('../db/database');

const statsController = {
  getStats: (req, res) => {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    // DAILY BABY LOGS
    const dailyLogsQuery = `
      SELECT 
        SUM(CASE WHEN type = 'feeding' THEN 1 ELSE 0 END) AS feedings,
        SUM(CASE WHEN type = 'sleep' THEN 1 ELSE 0 END) AS sleep,
        SUM(CASE WHEN type = 'symptom' THEN 1 ELSE 0 END) AS symptoms
      FROM baby_logs
      WHERE user_id = ? AND DATE(date) = ?
    `;

    db.get(dailyLogsQuery, [userId, today], (err, dailyLogs) => {
      if (err) return res.status(500).json(err);

      // WEEKLY LOGS
      const weeklyLogsQuery = `
        SELECT 
        strftime('%w', date) as day,
        SUM(CASE WHEN type = 'feeding' THEN 1 ELSE 0 END) AS feedings,
        SUM(CASE WHEN type = 'sleep' THEN 1 ELSE 0 END) AS sleep,
        SUM(CASE WHEN type = 'symptom' THEN 1 ELSE 0 END) AS symptoms
        FROM baby_logs
        WHERE user_id = ?
        GROUP BY day
      `;

      db.all(weeklyLogsQuery, [userId], (err, weeklyLogs) => {
        if (err) return res.status(500).json(err);

        // MONTHLY LOGS
        const monthlyLogsQuery = `
            SELECT 
                 strftime('%W', date) as week,
                 SUM(CASE WHEN type = 'feeding' THEN 1 ELSE 0 END) AS feedings,
                SUM(CASE WHEN type = 'sleep' THEN 1 ELSE 0 END) AS sleep,
                 SUM(CASE WHEN type = 'symptom' THEN 1 ELSE 0 END) AS symptoms
                FROM baby_logs
                WHERE user_id = ?
                GROUP BY week
                ORDER BY week
            `;

        db.all(monthlyLogsQuery, [userId], (err, monthlyLogs) => {
          if (err) return res.status(500).json(err);

          res.json({
            dailyLogs,
            weeklyLogs,
            monthlyLogs
          });
        });
      });
    });
  }
};

module.exports = statsController;