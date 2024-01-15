import { randomUUID } from 'crypto';
import { ClientModel } from '../models/client.model.js';
import { EmailAdapter } from './rabbit.controller.js';
import { RedisController } from './redis.controller.js';
import { TokenController } from './token.controller.js';
import { validateRegClient } from '../schemes/client.js';
import bcrypt from 'bcrypt'


async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export class ClientController {

    rabbitController = new EmailAdapter()
    redisController = new RedisController();
    tokenController = new TokenController();
    clientModel = new ClientModel();
    apiToken = ''

    async registerClient(request, h) {
        const validationResult = validateRegClient(request.payload)

        if (validationResult.error) {
            return h.response({ error: 'Invalid parameters.' }).code(400);
        }

        const { email, password, sendEmailValue, idToken } = validationResult.data;
        const encryptPassword = await hashPassword(password)
        const uuid = randomUUID();
        let valueParam = 0;
        let isActive = false;
        let labelEmail

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
        const isRegistedClient = await ClientModel.registerClient({ id: uuid, email, password: encryptPassword })
        const isRegistedParam = await ClientModel.registerGlobalParameter({ idClient: uuid, sendEmail: valueParam })

        const label = isRegistedClient && isRegistedParam ? 'Registered client' : 'Unregistered client'

        if (!isActive) { labelEmail = 'Welcome email was no sent.' }
        else {
            await EmailAdapter.sendEmail({ recipient: email })
            labelEmail = 'Welcome email was sent.'
        }

        return h.response({ message: label, sendEmail: labelEmail })

    }
}