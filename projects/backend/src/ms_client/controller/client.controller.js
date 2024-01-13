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
        const { email, password, sendEmail } = request.payload;
        const uuid = randomUUID();
        let valueParam = 0;
        let isActive = false;


        // validaciones ...

        await RedisController.saveValues({ key: uuid, value: sendEmail })

        const value = await RedisController.getValues({ key: uuid })

        if (value === 'true') {
            valueParam = 1
            isActive = true
        }

        // token - endpoint
        const { id, token } = await TokenController.generateToken()
        console.log('token generate', id)
        await TokenController.validateToken({ id })


        // save on bd
        const isRegistedClient = await ClientModel.registerClient({ id: uuid, email, password })
        const isRegistedParam = await ClientModel.registerGlobalParameter({ idClient: uuid, sendEmail: valueParam })

        const label = isRegistedClient && isRegistedParam ? 'Cliente registrado en la bd' : 'Cliente no registrado en la bd'

        if (!isActive) return h.response(isActive)
        await RabbitController.getMail({ isActive, recipient: email })

        return h.response(label)

    }
}