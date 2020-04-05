'user strict'
const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase');


firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://platzi-overflow-marcoet.firebaseio.com"
});

const db = firebase.database();

const Users = require('./user');
const Question = require('./questions')

module.exports = {
    users: new Users(db),
    question: new Question(db)
}