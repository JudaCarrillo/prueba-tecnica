import { RabbitModel } from "../models/rabbit.model.js";
import { registerMails } from ""

export class RabbitAdapter {
    static rabbitModel = new RabbitModel()

    static async processAndInsertIntoDB(msg) {
        await registerMails({
            recipient: msg.recipient,
            subject: msg.subject,
            content: msg.message
        });
    }

    static startConsuming() {
        RabbitModel.consumeMessage(this.processAndInsertIntoDB);
    }
}