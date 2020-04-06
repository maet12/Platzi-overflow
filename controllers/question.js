'use strict'
const { writeFile } = require('fs')
const { promisify } = require('util')
const { join } = require('path')
const { v1: uuidv1 } = require('uuid');
const questions = require('../models/index').question;

const write = promisify(writeFile);

async function createQuestions(req, h) {
    if (!req.state.user) {
        return h.redirect('/login');
    }

    let result, filename
    try {
        if (Buffer.isBuffer(req.payload.image)) {
            filename = `${uuidv1()}.png`
            await write(join(__dirname, '..', 'public', 'uploads', filename), req.payload.image)
        }

        result = await questions.create(req.payload, req.state.user, filename);
        req.log('info', `Pregunta creada con el ID ${result}`)
    } catch (error) {
        req.log('error', error)
        return h.view('ask', {
            title: 'Nueva pregunta',
            error: 'Problemas creado la pregunta'
        })
    }

    return h.redirect(`/question/${result}`)
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