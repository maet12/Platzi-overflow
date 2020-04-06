'use strict'
const Joi = require('joi');
const Boom = require('boom');
const question = require('../models/index').question
const authBasic = require('hapi-auth-basic');
const users = require('../models/index').users



module.exports = {
    name: 'api-rest',
    version: '1.0.0',
    async register(server, options) {
        const prefix = options.prefix || 'api';

        await server.register(authBasic)
        server.auth.strategy('simple', 'basic', {
            validate: validateAuth

        })

        server.route({
            method: 'GET',
            path: `/${prefix}/question/{key}`,
            options: {
                auth: 'simple',
                validate: {
                    params: {
                        key: Joi.string().required()
                    },
                    failAction: failValidation
                }
            },

            handler: async (req, h) => {
                let result
                try {
                    result = await question.getOne(req.params.key);

                    if (!result) {
                        Boom.notFound('No se pudo encontrar la pregunta');
                        req.log('info', 'No se pudo encontrar la pregunta')
                    }
                } catch (error) {
                    req.log('error', error)
                    return Boom.badImplementation('Hubo un error al buscar la pregunta')
                }

                return result;
            }
        })

        server.route({
            method: 'GET',
            path: `/${prefix}/questions/{amount}`,
            options: {
                auth: 'simple',
                validate: {
                    params: {
                        amount: Joi.number().integer().required().min(1)
                    },
                    failAction: failValidation
                }
            },

            handler: async (req, h) => {
                let result
                try {
                    result = await question.getLast(req.params.amount);

                    if (!result) {
                        Boom.notFound('No se pudo recuperar las preguntas');
                        req.log('info', 'No se pudo recuperar las preguntas')
                    }
                } catch (error) {
                    req.log('error', error)
                    return Boom.badImplementation('Hubo un error al buscar la pregunta')
                }

                return result;
            }
        })

        function failValidation(req, h, error) {
            return Boom.badRequest('Por favor utilice los parametros correctos.');
        }

        async function validateAuth(req, username, password, h) {
            let user;
            try {
                user = await users.validateUser({ email: username, password: password })
            } catch (error) {
                req.log('erro', error);
            }

            return {
                credentials: user || {},
                isValid: (user !== false)
            }
        }
    }
}