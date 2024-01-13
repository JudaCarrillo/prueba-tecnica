import { RabbitModel } from "../models/rabbit.models.js";

export class RabbitController {
    static rabbitModel = new RabbitModel()
    static apiUrl = 'http://localhost:3001/sendLog';

    constructor() {
        RabbitController.rabbitModel.connect()
        RabbitController.rabbitModel.createChannel()
    }

    static async getMail({ isActive, recipient }) {

        if (!isActive) return

        const dataToSend = {
            recipient,
            subject: 'Welcome to RabbitMQ',
            message: `Hi ${recipient}, nice to have you here.`
        }

        try {
            const response = await fetch(RabbitController.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const contentType = response.headers.get('Content-Type');
            let consumedMessage;

            if (contentType && contentType.includes('application/json')) {
                consumedMessage = await response.json();
            } else {
                consumedMessage = { message: 'Response is not JSON' };
            }

            await RabbitController.rabbitModel.consumeMessage()
        } catch (err) {
            console.error(err);
        }
    }

}