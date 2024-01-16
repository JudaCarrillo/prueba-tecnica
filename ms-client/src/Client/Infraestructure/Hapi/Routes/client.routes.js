import { ClientController } from "../Controllers/index.js";
import Joi from 'joi';

export const createClientRoutes = () => {
    const clientController = new ClientController();

    const clientRoutes = [
        {
            method: 'POST',
            path: '/reg-client',
            options: {
                handler: clientController.registerClient,
                description: 'Register a new client',
                notes: 'Creates a new customer account with the provided email and password. If the value of sendmail is true, a confirmation email will be sent. The registration process requires a valid ID token for authentication.',
                tags: ['api'],

                validate: {
                    payload: Joi.object({
                        email: Joi.string().required().description('The email address of the user.'),
                        password: Joi.string().required().description('The password of the user.'),
                        sendEmailValue: Joi.bool().required().description('A boolean flag indicating whether to send an email.'),
                        idToken: Joi.string().required().description('The authentication token for the user.')
                    })
                }
            }
        }
    ]

    return clientRoutes
}
