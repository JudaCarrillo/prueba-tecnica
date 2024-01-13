import { RedisController } from './controller/redis.controller.js'
import Hapi from '@hapi/hapi';

const init = async () => {
    const hapi = Hapi;
    const server = hapi.Server({
        port: process.env.PORT ?? 3003,
        host: 'localhost'
    });

    const redisController = new RedisController()

    server.route({
        method: 'POST',
        path: '/send-values',
        handler: redisController.saveValues
    })

    server.route({
        method: 'GET',
        path: '/get-values/{key}',
        handler: redisController.getValues
    })

    await server.start();
    console.log('Server running on:  %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
