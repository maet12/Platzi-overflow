'use strict'

const hapi = require('hapi');
const handlerbasr = require('handlebars')
const vision = require('vision')
const inert = require('inert');
const path = require('path')

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

        server.views({
            engines: {
                hbs: handlerbasr
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })
        server.route({
            method: 'GET',
            path: '/',
            handler: (req, h) => {
                return h.view('index', { title: 'Home' })
            }
        });

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.',
                    index: ['indez.html']
                }
            }
        });

        await server.start();
    } catch (error) {
        console.error(error)
        process(1);
    }

    console.log(`Servidor lanzado en: ${server.info.uri}`);

}

init();