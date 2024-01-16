import amqplib from 'amqplib';
import { envConfigRabbit } from '../Config/config.js';

export class RabbitService {

    rabbitSettings = {}
    amqp;
    producer;
    queue = '';
    chl;

    constructor() {
        this.rabbitSettings = {
            protocol: envConfigRabbit.RABBIT_PROTOCOL,
            hostname: envConfigRabbit.RABBIT_HOSTNAME,
            port: envConfigRabbit.RABBIT_PORT,
            username: envConfigRabbit.RABBIT_USERNAME,
            password: envConfigRabbit.RABBIT_PASSWORD,
            vhost: envConfigRabbit.RABBIT_VHOST,
            authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
        };

        this.amqp = amqplib;
        this.queue = 'emails'
    }

    async connect() {
        this.producer = await this.amqp.connect(this.rabbitSettings);
        this.chl = await this.producer.createChannel();
        await this.chl.assertQueue(this.queue)
    }

    async sendMessage({ recipient, subject, message }) {
        await this.connect();
        try {
            const logDetails = {
                recipient,
                subject,
                message,
                dateTime: new Date()
            }

            await this.chl.sendToQueue(this.queue, Buffer.from(JSON.stringify(logDetails)))

            console.log(`The message ${message} is sent to queue ${this.queue}`);
        } catch (err) {
            console.error('Error sending log:', err.message);
            throw err;
        }
    }
}