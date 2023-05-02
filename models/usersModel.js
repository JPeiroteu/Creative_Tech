const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static async getByUsername(username) {
    try {
      const [rows, fields] = await pool.query(
        'SELECT * FROM Users WHERE username = ?',
        [username]
      );

      if (rows.length > 0) {
        const { id, username, password } = rows[0];
        return new User(id, username, password);
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const [rows, fields] = await pool.query(
        'SELECT * FROM Users WHERE id = ?',
        [id]
      );

      if (rows.length > 0) {
        const { id, username, password } = rows[0];
        return new User(id, username, password);
      }
      return null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async save() {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);

      const [result, fields] = await pool.query(
        'INSERT INTO Users (username, password) VALUES (?, ?)',
        [this.username, hashedPassword]
      );

      this.id = result.insertId;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

module.exports = User;