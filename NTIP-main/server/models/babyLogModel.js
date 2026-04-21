// server/models/babyLogModel.js
const db = require('../db/database');

class BabyLog {
  static getAll(userId, callback) {
    db.all('SELECT * FROM baby_logs WHERE user_id = ? ORDER BY date DESC', [userId], callback);
  }

  static getById(id, userId, callback) {
    db.get('SELECT * FROM baby_logs WHERE id = ? AND user_id = ?', [id, userId], callback);
  }

  static create(babyLog, callback) {
    const { type, note, date, userId } = babyLog;
    db.run('INSERT INTO baby_logs (type, note, date, user_id) VALUES (?, ?, ?, ?)', [type, note, date, userId], function (err) {
      callback(err, { id: this.lastID, type, note, date, userId });
    });
  }

  static update(id, userId, updatedBabyLog, callback) {
    const { type, note, date } = updatedBabyLog;
    db.run(
      'UPDATE baby_logs SET type=?, note=?, date=? WHERE id=? AND user_id=?',
      [type, note, date, id, userId],
      function (err) {
      if (err) {
        return callback(err);
      }
      if (this.changes === 0) {
        return callback(null, null);
      }
      callback(null, { id, type, note, date, userId });
    });
  }

  static delete(id, userId, callback) {
    db.get('SELECT * FROM baby_logs WHERE id = ? AND user_id = ?', [id, userId], (err, babyLog) => {
      if (err) {
        return callback(err);
      }
      if (!babyLog) {
        return callback(null, null);
      }

      db.run('DELETE FROM baby_logs WHERE id = ? AND user_id = ?', [id, userId], function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, {
          id,
          type: babyLog.type,
          note: babyLog.note,
          date: babyLog.date,
          userId: babyLog.user_id,
        });
      });
    });
  }
}

module.exports = BabyLog;
