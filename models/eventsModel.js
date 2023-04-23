const db = require('../config/database');

class Event {
  constructor(id, name, description, date, location) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.location = location;
  }

  static async getAll() {
    try {
      const query = 'SELECT * FROM events';
      const [rows, fields] = await db.promise().query(query);

      const events = rows.map((row) => {
        return new Event(
          row.id,
          row.name,
          row.description,
          row.date,
          row.location
        );
      });

      return { status: 200, result: events };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = Event;
