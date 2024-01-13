import { Producer } from '../rabbitmq/producer.js';

export class MailsController {
    producer = new Producer()


    sentMail = async (request, h) => {
        try {
            const { recipient, subject, message } = request.payload;

            // Agrega validaciones adicionales según tus necesidades

            await this.producer.publishMessage({
                recipient: recipient,
                subject: subject,
                message: message
            });

            return h.response('Log sent and registered successfully').code(200);
        } catch (error) {
            console.error('Error sending log:', error.message);
            return h.response('Internal Server Error').code(500);
        }
    }
}

