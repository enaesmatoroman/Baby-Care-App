const db = require('../database');

db.run(`
  CREATE TABLE IF NOT EXISTS baby_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT CHECK(type IN ('feeding', 'sleep', 'symptom')) NOT NULL,
    note TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);
console.log("babyLogScheme loaded");
