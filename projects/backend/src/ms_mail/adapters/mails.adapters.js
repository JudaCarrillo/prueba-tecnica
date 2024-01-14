import { RabbitModel } from '../models/rabbit.model.js';
import { validateMail } from '../schemes/mail.js';

export class MailsController {

    rabbitModel = new RabbitModel()

    constructor() {
        RabbitModel.connect()
        RabbitModel.createChannel()
    }

    sentMail = async (request, h) => {
        try {

            const validationResult = validateMail(request.payload);

            if (validationResult.error) {
                return h.response({ error: 'Invalid parameters.' }).code(400);
            }

            const { recipient, subject, message } = validationResult.data;
            await RabbitModel.publishMessage({
                recipient,
                subject,
                message
            });

            return h.response('Log sent and registered successfully').code(200);
        } catch (error) {
            console.error('Error sending log:', error.message);
            return h.response('Internal Server Error').code(500);
        }
    }
}

