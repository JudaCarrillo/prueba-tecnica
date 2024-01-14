import Joi from 'joi';
import { MailsController } from '../adapters/mails.adapters.js';

export const createMailRoutes = () => {
    const controller = new MailsController()

    const mailRoutes = [
        {
            method: 'POST',
            path: '/sendLog',
            options: {
                handler: controller.sentMail,
                description: 'Send Email Log',
                notes: 'Endpoint to receive a request for email sending and log the information in the database.',
                tags: ['api'],

                validate: {
                    payload: Joi.object({
                        recipient: Joi.string().required().description('Email recipient'),
                        subject: Joi.string().required().description('Email subject'),
                        message: Joi.string().required().description('Email message')
                    })
                }
            }
        }
    ]

    return mailRoutes
}
