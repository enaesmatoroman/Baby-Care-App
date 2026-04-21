const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./books.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, rows) => {
  console.log("TABLES:", rows);
});
module.exports = db;