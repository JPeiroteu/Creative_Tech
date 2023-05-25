const pool = require("../config/database");

function eventFromDB(dbObj) {
  return {
    id: dbObj.event_id,
    name: dbObj.event_name,
    date: dbObj.event_date,
    location: dbObj.event_location,
    description: dbObj.event_description,
    image: dbObj.event_image,
  };
}

class Event {
  constructor(id, name, date, location, description, image) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
    this.description = description;
    this.image = image;
  }

  static async allEvents() {
    try {
      let result = [];
      let [rows, _] = await pool.query("SELECT id, name, date, location, description FROM Events");
      for (let row of rows) {
        let event = new Event(row.id, row.name, row.date, row.location, row.description);
        result.push(event);
      }
      result.reverse();
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }


  async isUserGoing(eventId, userId) {
    const query = 'SELECT * FROM User_Events WHERE event_id = ? AND user_id = ? AND is_going = 1';
    const result = await pool.query(query, [eventId, userId]);
    return result.length > 0;
  }

  async addAttendee(eventId, userId) {
    const query = 'INSERT INTO User_Events (event_id, user_id, is_going) VALUES (?, ?, 1)';
    await pool.query(query, [eventId, userId]);
  }
  
  async removeAttendee(eventId, userId) {
    const query = 'DELETE FROM User_Events WHERE event_id = ? AND user_id = ?';
    await pool.query(query, [eventId, userId]);
    }
}

module.exports = Event;
