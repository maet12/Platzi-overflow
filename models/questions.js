'use strict'

class Questions {
    constructor(db) {
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

    async getLast(amount) {
        const query = await this.collection.limitToLast(amount).once('value');
        const data = query.val();

        return data;
    }

    async getOne(id){
        const query = await this.collection.child(id).once('value');
        const data = query.val();
        return data;
    }
}

module.exports = Questions;