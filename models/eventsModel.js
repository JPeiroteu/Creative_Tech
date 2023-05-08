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
      let [rows, _] = await pool.query("SELECT id, name, date, location, description FROM Events");
      for (let row of rows) {
        let event = new Event(row.id, row.name, row.date, row.location, row.description);
        result.push(event);
      }
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: [] };
    }
  }
}

class SpecialEvent extends Event {
  constructor(id, name, date, location, description, maxParticipants, price) {
    super(id, name, date, location, description);
    this.maxParticipants = maxParticipants;
    this.price = price;
  }

  static async allSpecialEvents() {
    try {
      let result = [];
      let [rows, _] = await pool.query("SELECT id, name, date, location, description, maxParticipants, price FROM Events WHERE maxParticipants IS NOT NULL AND price IS NOT NULL");
      for (let row of rows) {
        let specialEvent = new SpecialEvent(row.id, row.name, row.date, row.location, row.description, row.maxParticipants, row.price);
        result.push(specialEvent);
      }
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: [] };
    }
  }
}

module.exports = { Event, SpecialEvent };
