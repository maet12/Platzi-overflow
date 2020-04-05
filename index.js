'use strict'

const hapi = require('hapi');
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

        server.route({
            method: 'GET',
            path: '/home',
            handler: (req, h) => {
                return h.file('index.html')
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