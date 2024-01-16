
import { validatePartialEmail } from '../Schemes/mail.js';

export class EmailController {

    constructor(rabbitService) {
        this.rabbitService = rabbitService
    }

    async sendMessage({ recipient }) {
        try {
            const validationResult = validatePartialEmail({ recipient });

            if (!validationResult.success) {
                return { error: validationResult.error }
            }

            const subject = 'Welcome to RabbitMQ'
            const message = `Hi ${recipient}, nice to have you here.`


            await this.rabbitService.sendMessage({ recipient, subject, message });

            return ('Log sent and registered successfully')
        } catch (error) {
            console.error('Error sending log:', error.message);
            return ('Internal Server Error')
        }
    }
}