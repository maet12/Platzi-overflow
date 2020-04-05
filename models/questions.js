'use strict'

class Questions {
    constructor (db){
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('questions');
    }

    async create(data, user) {
        data.owner = user;
        const question = {
            ...data
        };

        const questionNew = this.collection.push(question);
        return questionNew.key;
    }
}

module.exports = Questions;