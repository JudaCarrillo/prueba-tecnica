import amqplib from 'amqplib';

export class RabbitService {

    rabbitSettings = {}
    amqp;
    consumer;
    queue = '';
    chl;

    constructor() {
        this.rabbitSettings = {
            protocol: 'amqp',
            hostname: 'localhost',
            port: 5672,
            username: 'guest',
            password: 'guest',
            vhost: '/',
            authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
        };

        this.amqp = amqplib;
        this.queue = 'emails'
    }

    async connect() {
        this.consumer = await this.amqp.connect(this.rabbitSettings);
        this.chl = await this.consumer.createChannel();
        await this.chl.assertQueue(this.queue);
    }

    async runConsumer(callback) {
        await this.connect();

        try {
            this.chl.consume(this.queue, (message) => {
                if (message === null) {
                    console.error('The message is empty');
                    return
                }

                const msg = JSON.parse(message.content.toString());
                this.chl.ack(message)
                callback(msg)
            });

        } catch (error) {
            console.error('Error consuming message:', error.message);
            throw error;
        }
    }

    async closeConnect() {
        await this.consumer.close();
    }
}
