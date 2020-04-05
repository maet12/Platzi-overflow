'use strict'

const hapi = require('hapi');

const server = hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
})

async function init (){
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) =>{
            return 'Hola mundo!'
        }
    });

    try {
        await server.start()
    } catch (error) {
        console.error(error)
        process(1);
    }

    console.log(`Servidor lanzado en: ${server.info.uri}`);
    
}

init();