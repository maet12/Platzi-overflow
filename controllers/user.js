'use strict'
const users = require('../models/index').users

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

async function validateUser(req, h){
    let result;

    try {
        result = await users.validateUser(req.payload);
    } catch (error) {
        console.error(error);
        return h.response('Error al valida los usuarios').code(500)
    }

    return h.response(result)

}

module.exports = {
    createUser: createUser, validateUser
}