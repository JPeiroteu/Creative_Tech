const pool = require("../config/database");

class Event {
  constructor(id, name, date, location, description) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
  }

  static async allEvents() {
    try {
      let result = [];
      let [rows, _] = await pool.query("SELECT * FROM Events");
      for (let row of rows) {
        let event = new Event(row.event_id, row.event_name, row.event_date, row.event_location, row.event_description);
        result.push(event);
      }
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: [] };
    }
  }
  
}

module.exports = Event;