import { randomUUID } from 'crypto';
import { ClientModel } from '../models/client.model.js';
import { RabbitController } from './rabbit.controller.js';
import { RedisController } from './redis.controller.js';
import { TokenController } from './token.controller.js';

export class ClientController {

    rabbitController = new RabbitController()
    redisController = new RedisController();
    tokenController = new TokenController();
    clientModel = new ClientModel();
    apiToken = ''



    async registerClient(request, h) {
        const { email, password, sendEmailValue, idToken } = request.payload;
        const uuid = randomUUID();
        let valueParam = 0;
        let isActive = false;
        let labelEmail

        // validaciones ...

        const strSendEmail = sendEmailValue ? 'true' : 'false'

        await RedisController.saveValues({ key: uuid, value: strSendEmail })

        const value = await RedisController.getValues({ key: uuid })

        if (value === 'true') {
            valueParam = 1
            isActive = true
        }

        // token - endpoint
        const isValid = await TokenController.validateToken({ id: idToken })
        const isValidValue = isValid['Valid token'];
        if (isValidValue === false) return h.response({ message: 'Invalid token' })


        // save on bd
        const isRegistedClient = await ClientModel.registerClient({ id: uuid, email, password })
        const isRegistedParam = await ClientModel.registerGlobalParameter({ idClient: uuid, sendEmail: valueParam })

        const label = isRegistedClient && isRegistedParam ? 'Registered client' : 'Unregistered client'


        if (!isActive) { labelEmail = 'Welcome email was no sent.' }
        else {
            await RabbitController.getMail({ isActive, recipient: email })
            labelEmail = 'Welcome email was sent.'
        }

        return h.response({ message: label, sendEmail: labelEmail })

    }
}