import amqplib from 'amqplib';

export class RabbitModel {
    amqp
    rabbitSettings

    constructor() {
        this.amqp = amqplib;
        this.rabbitSettings = {
            protocol: 'amqp',
            hostname: 'localhost',
            port: 5672,
            username: 'guest',
            password: 'guest',
            vhost: '/',
            authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
        }
    }

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

    async consumeMessage() {
        const queue = 'mails';

        try {
            if (!this.chl) await this.createChannel();

            

            this.chl.consume(queue, message => {
                const msg = JSON.parse(message.content.toString());
                console.log(msg);
            })
        } catch (err) {
            console.error(err);
        }
    }

}