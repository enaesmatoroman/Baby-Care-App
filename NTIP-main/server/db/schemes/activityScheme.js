const db = require('../database');

db.run(`
    CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        activity_type TEXT CHECK(activity_type IN ('reminder', 'appointment')) NOT NULL,
        title TEXT NOT NULL,
        notes TEXT,
        activity_time DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        UNIQUE(user_id, title, activity_time)
    )
`);

