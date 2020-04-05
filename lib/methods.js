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

module.exports = {
    setAnswerRight
}