import Hapi from '@hapi/hapi';
import { createClientRoutes } from './routes/client.routes.js';

const init = async () => {
    const hapi = Hapi;
    const server = hapi.Server({
        port: process.env.PORT ?? 3003,
        host: 'localhost'
    });

    server.route(createClientRoutes())

    await server.start();
    console.log('Server running on:  %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
