import { RabbitService, MailRepository } from "../../Infrastructure";

const mailUseCase = new MailRepository();
const rabbitMQAdapter = new RabbitService();

export function registerEmail() {
    const rabbitMQMessage = {
        recipient: 'example@example.com',
        subject: 'Greetings',
        content: 'Hello, welcome to our platform!'
    };


    rabbitMQAdapter.handleMessage(rabbitMQMessage);

}

