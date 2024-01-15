import { Mail } from '../../Domain/index.js';
import { validateEmail } from '../../Schemes/mail.js';

export class RabbitToMysqlController {

    constructor(rabbitService, mysqlRepository) {
        this.rabbitService = rabbitService;
        this.mysqlRepository = mysqlRepository;
    }

    async proccessMessage(message) {
        const validationResult = validateEmail(message)

        if (!validationResult.success) return

        const msg = new Mail(validationResult.data);
        const { recipient, subject, content } = msg;

        await this.mysqlMailRepository.save({ recipient, subject, content })
        console.log('Correo registrado en la base de datos:', message);
    }

    async startListening() {
        await this.rabbitService.runConsumer((message) => this.proccessMessage(message))
    }
}