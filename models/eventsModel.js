const pool = require("../config/database");

function eventFromDB(dbObj) {
  return {
    id: dbObj.event_id,
    name: dbObj.event_name,
    date: dbObj.event_date,
    location: dbObj.event_location,
    description: dbObj.event_description,
    image: dbObj.event_image,
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
      let [dbEvents, _] = await pool.query("SELECT * FROM Events");
      for (let dbEvent of dbEvents) {
        let event = eventFromDB(dbEvent);
        // Obter o número total de participantes para cada evento
        const query = 'SELECT COUNT(*) as attendees FROM User_Events WHERE event_id = ? AND is_going = 1';
        const [rows, _] = await pool.query(query, [dbEvent.event_id]);
        event.attendees = rows[0].attendees;
        result.push(event);
      }
      result.reverse();
      return { status: 200, result: result };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  static async isUserGoing(eventId, userId) {
    const query = 'SELECT * FROM User_Events WHERE event_id = ? AND user_id = ?';
    const [rows, _] = await pool.query(query, [eventId, userId]);
    return rows.length > 0;
  }

  static async addAttendee(eventId, userId) {
    const query = 'INSERT INTO User_Events (event_id, user_id, is_going) VALUES (?, ?, 1)';
    await pool.query(query, [eventId, userId]);
  }
}

module.exports = Event;
