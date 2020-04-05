'use strict'
const questions = require('../models/index').question;

async function home(req, h) {
    let data;

    try {
        data = await questions.getLast(10);
        console.log(data);
        
    } catch (error) {
        console.error(error)
    }
    return h.view('index', { title: 'Home', user: req.state.user, questions: data })
}

function register(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }
    return h.view('register', { title: 'Registro', user: req.state.user })
}

function login(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }
    return h.view('login', { title: 'Ingrese', user: req.state.user })
}

function notFound(req, h) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404);
}

function fileNotFound(req, h) {
    const respose = req.response;
    if (respose.isBoom && respose.output.statusCode === 404) {
        return h.view('404', {}, { layout: 'error-layout' }).code(404);
    }

    return h.continue;
}

function ask(req, h) {
    if (!req.state.user) {
        return h.redirect('/')
    }

    return h.view('ask', { title: 'Nueva pregunta', user: req.state.user })
}

module.exports = {
    home, register, login, notFound, fileNotFound, ask
}