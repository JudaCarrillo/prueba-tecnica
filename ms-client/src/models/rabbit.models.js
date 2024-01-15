import amqplib from 'amqplib';

export class RabbitModel {
    static rabbitSettings = {
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest',
        vhost: '/',
        authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
    }
    static amqp = amqplib;
    static conn = null;
    static chl = null;
    static queue = 'emails';

    static async connect() {
        RabbitModel.conn = await RabbitModel.amqp.connect(RabbitModel.rabbitSettings);
    }

    static async createChannel() {
        if (!RabbitModel.conn) await RabbitModel.connect();
        RabbitModel.chl = await RabbitModel.conn.createChannel();
    }

    static async publishMessage({ recipient, subject, message }) {
        try {
            if (!RabbitModel.chl) await RabbitModel.createChannel();

            const logDetails = {
                recipient: recipient,
                subject: subject,
                message: message,
                dateTime: new Date()
            }

            await RabbitModel.chl.assertQueue(this.queue)
            await RabbitModel.chl.sendToQueue(this.queue, Buffer.from(JSON.stringify(logDetails)))

            console.log(`The message ${message} is sent to queue ${this.queue}`);
        } catch (err) {
            console.error('Error sending log:', err.message);
            throw err;
        }
    }
}