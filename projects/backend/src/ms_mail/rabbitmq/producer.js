import amqplib from 'amqplib';
import { registerMails } from '../logic/registerMails.js';

export class Producer {

    rabbitSettings = {
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest',
        vhost: '/',
        authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
    }

    amqp = amqplib;
    conn = null;
    chl = null;

    async connect() {
        this.conn = await this.amqp.connect(this.rabbitSettings);
    }

    async createChannel() {
        if (!this.conn) await this.connect();
        this.chl = await this.conn.createChannel();
    }

    async closeConnection() {
        if (this.conn) await this.conn.close();
    }

    async publishMessage({ recipient, subject, message }) {
        const queue = 'mails'
        try {
            if (!this.chl) await this.createChannel();

            const logDetails = {
                recipient: recipient,
                subject: subject,
                message: message,
                dateTime: new Date()
            }

            await this.chl.assertQueue(queue) 
            await this.chl.sendToQueue(queue, Buffer.from(JSON.stringify(logDetails)))


            await registerMails({
                recipient: logDetails.recipient,
                subject: logDetails.subject,
                content: logDetails.message
            });

            console.log(`The message ${message} is sent to queue ${queue}`);
        } catch (err) {
            console.error('Error sending log:', err.message);
            throw err;
        }
    }
}
