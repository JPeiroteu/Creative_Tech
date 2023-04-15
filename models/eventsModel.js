const pool = require("../config/database");

function eventFromDB(dbObj) {
  return new Event(
    dbObj.event_id,
    dbObj.event_name,
    dbObj.event_date,
    dbObj.event_location,
    dbObj.event_description
  );
}

class Event {
  constructor(id, name, date, location, description) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
  }

  static async getAll() {
    try {
      let result = [];
      let [dbEvents, fields] = await pool.query("SELECT * FROM Events");
      for (let dbEvent of dbEvents) {
        result.push(eventFromDB(dbEvent));
      }
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }
}

module.exports = Event;
