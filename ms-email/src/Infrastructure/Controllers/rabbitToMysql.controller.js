import { Mail } from '../../Domain/index.js';
import { validateEmail } from '../Schemes/mail.js';

export class RabbitToMysqlController {

    constructor(rabbitService, mysqlRepository) {
        this.rabbitService = rabbitService;
        this.mysqlRepository = mysqlRepository;
    }

    proccessMessage = async (msg) => {
        const validationResult = validateEmail(msg)

        if (!validationResult.success) return validationResult.error

        const { recipient, subject, message } = validationResult.data;
        await this.mysqlRepository.save({ recipient, subject, content: message })
        console.log('Correo registrado en la base de datos:', message);
    }

    async startListening() {
        await this.rabbitService.runConsumer(this.proccessMessage)

    }
}