import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import vision from '@hapi/vision';
import hapiswagger from 'hapi-swagger';
import { createMailRoutes } from './routes/mail.ruote.js'

const swaggerOptions = {
    info: {
        title: 'Token API Documentation',
        version: '1.0',
    },
}

const init = async () => {
    const hapi = Hapi;
    const server = hapi.Server({
        port: process.env.PORT ?? 3001,
        host: 'localhost',
        "routes": {
            "cors": {
                "origin": ["http://localhost:3003"],
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

    server.route(createMailRoutes())

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

init();
