'use strict'

const hapi = require('hapi');
const handlerbasr = require('./lib/helpers')
const vision = require('vision')
const inert = require('inert');
const routes = require('./routes')
const path = require('path')
const site = require('./controllers/site')
const methods = require('./lib/methods');
const good = require('good');

const server = hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
})

async function init() {

    try {
        await server.register(inert);
        await server.register(vision);
        await server.register({
            plugin: good,
            options: {
                reporters: {
                    console: [{
                        module: 'good-console'
                    },
                        'stdout'
                    ]
                }
            }
        })
        server.method('setAnswerRight', methods.setAnswerRight);
        server.method('getLast', methods.getLast, {
            cache: {
                expiresIn: 1000 * 60,
                generateTimeout: 2000
            }
        });

        server.state('user', {
            ttl: 1000 * 60 * 60 * 24 * 7,
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json'
        })
        server.views({
            engines: {
                hbs: handlerbasr
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })

        server.ext('onPreResponse', site.fileNotFound)
        server.route(routes)
        await server.start();
        server.log('info', 'Servidor lanzado')
    } catch (error) {
        console.error(error)
        process(1);
    }
}

process.on('unhandledRejection', error => {
    server.log('unhandledRejection', error)
})

process.on('ununhandledException', error => {
    server.log('ununhandledException', error)
})

init();