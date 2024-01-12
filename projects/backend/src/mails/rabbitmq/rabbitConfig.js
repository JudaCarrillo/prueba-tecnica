import amqplib from 'amqplib';
import { registerMails } from '../logic/registerMails';

export const createRabbitMQ = async () => {
    const amqp = amqplib;

    const conn = await amqp.connect('amqp://localhost');
    const chl = await conn.createChannel();
    const queue = 'orden_envio_correo';

    await chl.assertQueue(queue);

    chl.consume(queue, (msg) => {
        if (msg === null) {
            console.error('Consumer cancelled by server');
            return
        }

        const ordenEnvio = JSON.parse(msg.content.toString());
        registerMails(ordenEnvio)
    });

    return { conn, chl, queue };
}

