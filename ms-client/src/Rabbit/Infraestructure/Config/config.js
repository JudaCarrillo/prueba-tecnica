import * as dotenv from 'dotenv'

dotenv.config()

export const envConfigRabbit = {
    RABBIT_PROTOCOL: process.env.RABBIT_PROTOCOL || 'amqp',
    RABBIT_PORT: process.env.RABBIT_PORT || 5672,
    RABBIT_USERNAME: process.env.RABBIT_USERNAME || 'guest',
    RABBIT_PASSWORD: process.env.RABBIT_PASSWORD || 'guest',
    RABBIT_VHOST: process.env.RABBIT_VHOST || '/',
    RABBIT_HOSTNAME: process.env.RABBIT_HOSTNAME || 'localhost',
}