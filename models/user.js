'user strict'

const bcrypt = require('bcrypt')

class Users {
    constructor(db) {
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('users')
    }

    async create(data) {        
        data.password = await this.constructor.encrypt(data.password);
        const user = {
            ...data
        }
        const newUser = this.collection.push(user);
        return newUser.key;
    }

    static async encrypt(passwd) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwd, saltRounds)

        return hashedPassword;
    }
}

module.exports = Users;