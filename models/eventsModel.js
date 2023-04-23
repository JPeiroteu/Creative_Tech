const db = require('../config/database');

class Event {
  constructor(event_name, event_date, event_location, event_description) {
    this.name = event_name;
    this.date = event_date;
    this.location = event_location;
    this.description = event_description;
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
