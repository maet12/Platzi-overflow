'use strict'
const users = require('../models/index').users
const boom = require('boom');


async function createUser(req, h) {
    let result
    try {
        result = await users.create(req.payload)
    } catch (error) {
        console.error(error);
        return h.response('problemas creado el usuario').code(500)
    }

    return h.response(`Usuario creado ID: ${result}`)
}

async function validateUser(req, h) {
    let result;

    try {
        result = await users.validateUser(req.payload);
        if (!result) {
            return h.response('Email y/o contraseña incorrecta').code(401)
        }
    } catch (error) {
        console.error(error);
        return h.response('Error al valida los usuarios').code(500)
    }

    return h.redirect('/').state('user',{
        name: result.name,
        email: result.email
    })
}

function logout(req, h){
    return h.redirect('/login').unstate('user');
}

function  failValidation(req, h, erro) {
    boom.badRequest('Fallo la validación', req.payload)
}

module.exports = {
    createUser: createUser, validateUser, logout, failValidation
}