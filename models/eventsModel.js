const pool = require("../config/database");

function eventFromDB(dbObj) {
    return {
        id: dbObj.ev_id,
        title: dbObj.ev_title,
        description: dbObj.ev_description,
        date: dbObj.ev_date,
        location: dbObj.ev_location
    };
}

class Event {
    static async getAll() {
        try {
            let result = [];
            let [dbEvents, fields] = await pool.query("SELECT * FROM events");
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
