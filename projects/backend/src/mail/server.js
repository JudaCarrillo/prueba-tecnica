import Hapi from '@hapi/hapi';
import { MailsController } from './controllers/mails.controller.js';
import { Producer } from './rabbitmq/producer.js';

const init = async () => {
    const hapi = Hapi;
    const server = hapi.Server({
        port: process.env.PORT ?? 3000,
        host: 'localhost'
    });

    const producer = new Producer()
    await producer.connect()
    await producer.createChannel()
    const controller = new MailsController()

    server.route({
        method: 'POST',
        path: '/sendLog',
        handler: controller.sentMail
    })

    await server.start();
    console.log('Server running on:  %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
