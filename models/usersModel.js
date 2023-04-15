const pool = require("../config/database");

function userFromDB(dbObj) {
    return new User(dbObj.id, dbObj.username, dbObj.password, dbObj.email);
}

class User {
    constructor(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static async getAll() {
        try {
            let result = [];
            let [dbUsers, fields] = await pool.query("SELECT * FROM Users");
            for (let dbUser of dbUsers) {
                result.push(userFromDB(dbUser));
            }
            return { status: 200, result: result };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = User;
