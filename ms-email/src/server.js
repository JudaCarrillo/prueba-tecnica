import Hapi from '@hapi/hapi';
import { RabbitAdapter } from './adapters/emails.adapters.js';

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
    });

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
        await RabbitAdapter.startConsuming()
    } catch (err) {
        console.log(err);
    }
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
