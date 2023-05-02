const pool = require("../config/database");
const bcrypt = require("bcrypt");

function userFromDB(dbObj) {
    return new User(
        dbObj.user_id,
        dbObj.username,
        dbObj.email,
        dbObj.password
    );
}

class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
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

    static async getByUsername(username) {
        try {
            let [dbUser, fields] = await pool.query(
                "SELECT * FROM Users WHERE username = ?",
                [username]
            );
            if (dbUser.length > 0) {
                return { status: 200, result: userFromDB(dbUser[0]) };
            } else {
                return { status: 404, result: "User not found" };
            }
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async authenticate(username, password) {
        try {
            let result = await this.getByUsername(username);
            if (result.status == 200) {
                let user = result.result;
                if (await bcrypt.compare(password, user.password)) {
                    return { status: 200, result: user };
                } else {
                    return { status: 401, result: "Incorrect password" };
                }
            } else {
                return result;
            }
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = User;
