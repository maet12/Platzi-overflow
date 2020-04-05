'user strict'
const site = require('./controllers/site')
const user = require('./controllers/user')
const joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: site.home
    },
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'POST',
        options: {
            validate: {
                payload: {
                    name: joi.string().required().min(3),
                    email: joi.string().email().required(),
                    password: joi.string().required().min(6)
                }
            }
        },
        path: '/create-user',
        handler: user.createUser
    },
    {
        path: '/validate-user',
        method: 'POST',
        options: {
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().required().min(6)
                }
            }
        },
        handler: user.validateUser
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['indez.html']
            }
        }
    }
]