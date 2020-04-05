'use strict'

const questions = require('../models/index').question;

async function createQuestions(req, h){
    let result
    try {
        result = await questions.create(req.payload, req.state.user);
        console.log(`Pregunta creada con el ID ${result}`)
    } catch (error) {
        console.error(error);
        return h.view('ask', {
            title: 'Nueva pregunta',
            error: 'Problemas creado la pregunta'
        })
    }

    return h.response(`Pregunta creada con el ID ${result}`)
}

module.exports = {
    createQuestions
}