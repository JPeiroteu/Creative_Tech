const db = require('./db');

async function verifyCredentials(username, password) {
  const conn = await db.getConnection();
  const [rows] = await conn.execute('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password]);
  conn.release();
  return rows.length > 0 ? rows[0] : null;
}

module.exports = {
  verifyCredentials
};
