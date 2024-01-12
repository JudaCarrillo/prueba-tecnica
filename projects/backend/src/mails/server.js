import Hapi from '@hapi/hapi';
import { createRabbitMQ } from './rabbitmq/rabbitConfig.js';

const init = async () => {
    const hapi = Hapi;
    const server = hapi.Server({
        port: 3000,
        host: 'localhost'
    });

    await createRabbitMQ();
    await server.start();
    console.log('Server running on:  %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
