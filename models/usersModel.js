const pool = require("../config/database");

class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static async authentication(email, password) {
        try {
            let result = [];
            let [rows, _] = await pool.query("SELECT * FROM Users WHERE " +
                "email = ? AND password = ?", [email, password]);

            if (rows.length === 1) {
                const userRow = rows[0];
                return new User(userRow.user_id, userRow.username,
                    userRow.password, userRow.email);
            }
            return { status: 200, result: result };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = User;
