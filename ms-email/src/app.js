import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import { MySQLMailRepository, RabbitService } from './Infrastructure/Brokers/index.js';
import { RabbitToMysqlController } from './Infrastructure/Controllers/rabbitToMysql.controller.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const swaggerOptions = {
    info: {
        title: 'Token API Documentation',
        version: '1.0',
    },
}

const rabbitService = new RabbitService();
const mysqlRepository = new MySQLMailRepository()
const rabbitToMysqlController = new RabbitToMysqlController(rabbitService, mysqlRepository)

const init = async () => {
    const hapi = Hapi;
    const server = hapi.Server({
        port: process.env.PORT ?? 3001,
        host: 'localhost',
    });


    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
        await rabbitToMysqlController.startListening()
    } catch (err) {
        console.log(err);
    }
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
