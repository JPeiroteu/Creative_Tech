class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async getAll() {
        try {
            let result = [];
            for (let user of users) {
                result.push(new User(user.id, user.name, user.email));
            }
            return { status: 200, result: result };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }


}

module.exports = User;