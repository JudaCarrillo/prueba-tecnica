import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import vision from '@hapi/vision';
import hapiswagger from 'hapi-swagger';
import { createClientRoutes } from './Routes/client.routes.js';

const swaggerOptions = {
    info: {
        title: 'Client API Documentation',
        version: '1.0',
    },
}

export const initServer = async () => {
    const hapi = Hapi;
    const server = hapi.Server({
        port: process.env.PORT ?? 3002,
        host: 'localhost',
        "routes": {
            "cors": {
                "origin": ["http://localhost:4200"],
                "headers": ["Accept", "Content-Type"],
                "additionalHeaders": ['X-Requested-With']
            },
        }
    });

    await server.register([
        inert,
        vision,
        {
            plugin: hapiswagger,
            options: swaggerOptions
        }
    ])

    server.route(createClientRoutes())

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

