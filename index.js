'use strict'

const hapi = require('hapi');
const handlerbasr = require('handlebars')
const vision = require('vision')
const inert = require('inert');
const routes = require('./routes')
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

        server.route(routes)
        await server.start();
    } catch (error) {
        console.error(error)
        process(1);
    }

    console.log(`Servidor lanzado en: ${server.info.uri}`);

}

init();