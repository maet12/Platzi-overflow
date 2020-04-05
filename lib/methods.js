'use strict'
const question = require('../models/index').question;

async function setAnswerRight(questionId, aswerId, user){
    let result;
    try {
        result = await question.setAnswerRight(questionId, aswerId, user);
    } catch (error) {
        console.error(error)
        return false;
    }

    return result
}

async function getLast(amout){
    let data;

    try {
        data = await question.getLast(amout);
        console.log(data);
        
    } catch (error) {
        console.error(error)
    }

    return data;
}

module.exports = {
    setAnswerRight, getLast
}