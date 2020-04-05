'use strict'

const questions = require('../models/index').question;

async function createQuestions(req, h) {
    if (!req.state.user) {
        return h.redirect('/login');
    }

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

async function answerQuestion(req, h) {
    if (!req.state.user) {
        return h.redirect('/login');
    }


    let result;
    try {
        result = await questions.answer(req.payload, req.state.user);
        console.log(`Respuesta creda: ${result}`);

    } catch (error) {
        console.error(error)
    }

    return h.redirect(`/question/${req.payload.id}`)
}

async function setAnswerRight(req, h) {
    if (!req.state.user) {
        return h.redirect('/login');
    }


    let result;
    try {
        result = await req.server.methods.setAnswerRight(req.params.questionId, req.params.answerId, req.state.user);
        console.log(result);
    } catch (error) {
        console.error(error)
    }

    return h.redirect(`/question/${req.params.questionId}`);
}

module.exports = {
    createQuestions, answerQuestion, setAnswerRight
}