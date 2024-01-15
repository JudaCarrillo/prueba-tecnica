
import { RabbitModel } from '../models/rabbit.models.js';
import { validatePartialEmail } from '../schemes/mail.js';

export class EmailAdapter {

    rabbitModel = new RabbitModel()

    static sendEmail = async ({ recipient }) => {
        try {

            const validationResult = validatePartialEmail({ recipient });
            const subject = 'Welcome to RabbitMQ'
            const message = `Hi ${recipient}, nice to have you here.`

            if (validationResult.error) {
                return { error: 'Invalid parameters.' }
            }

            await RabbitModel.publishMessage({ recipient, subject, message });

            return ('Log sent and registered successfully')
        } catch (error) {
            console.error('Error sending log:', error.message);
            return ('Internal Server Error')
        }
    }
}