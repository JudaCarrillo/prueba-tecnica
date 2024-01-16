import { randomUUID } from 'crypto';
import { EmailController, RabbitService } from '../../../../Rabbit/Infraestructure/index.js';
import { APIRestToken } from '../../../../Token/Infraestructure/index.js';
import { MySQLClientGlobalParamRepository, RedisRepository } from '../../Persistence/index.js'
import { RedisController } from './redis.controller.js';
import { validateRegClient } from '../../Schemes/client.js'
import { hashPassword } from '../../../Domain/index.js';
import { ClientGlobalParamsService } from '../../../Application/index.js'

const redisRepository = new RedisRepository();
const redisController = new RedisController(redisRepository);

const clientGlobalParamRepository = new MySQLClientGlobalParamRepository();
const clientGlobalParamController = new ClientGlobalParamsService(clientGlobalParamRepository);

const rabbitService = new RabbitService();
const emailController = new EmailController(rabbitService);

const tokenController = new APIRestToken();

export class ClientController {

    async registerClient(request, h) {
        const validationResult = validateRegClient(request.payload)

        if (!validationResult.success) return h.response({ error: validationResult.error }).code(400);

        const { email, password, sendEmailValue, idToken } = validationResult.data;

        const encryptPassword = await hashPassword(password)
        const uuid = randomUUID();
        let valueParam = 0;
        let isActive = false;
        let labelEmail

        const strSendEmail = sendEmailValue ? 'true' : 'false'

        // Token
        const isValid = await tokenController.validateToken({ idToken })
        console.log(isValid);
        const isValidValue = isValid['Valid token'];

        if (isValidValue === false) return h.response({ message: 'Invalid token' })

        // Redis
        await redisController.saveValues({ key: uuid, value: strSendEmail })
        const value = await redisController.getValues({ key: uuid })
        if (value === 'true') {
            valueParam = 1
            isActive = true
        }

        // Persistence / client
        const isRegistedClient = await clientGlobalParamController.saveClient({ id: uuid, email, password: encryptPassword })
        // Persistence / global params
        const isRegistedParam = await clientGlobalParamController.saveGlobalParams({ idClient: uuid, sendEmail: valueParam })

        const label = isRegistedClient && isRegistedParam ? 'Registered client' : 'Unregistered client'

        if (!isActive) { labelEmail = 'Welcome email was no sent.' }
        else {
            await emailController.sendMessage({ recipient: email })
            labelEmail = 'Welcome email was sent.'
        }

        return h.response({ message: label, sendEmail: labelEmail })

    }
}

