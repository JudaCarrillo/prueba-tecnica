import Joi from 'joi';
import { TokenToMysqlController } from '../Controllers/tokenToMysql.controller.js';
import { MySQLTokenRepository } from '../../Persistence/token.repository.js';

export const createTokenRoutes = () => {
    const mysqlRepository = new MySQLTokenRepository();
    const tokenToMysqlController = new TokenToMysqlController(mysqlRepository);

    const tokensRoutes = [
        {
            method: 'GET',
            path: '/generate',
            options: {
                handler: tokenToMysqlController.generate,
                description: 'Generate token',
                notes: 'Generates a security token of 8 digits.',
                tags: ['api'],
            }
        },
        {
            method: 'GET',
            path: '/validate/{id}',
            options: {
                handler: tokenToMysqlController.validate,
                description: 'Validate Token',
                notes: 'Validates the authenticity of a security token.',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string().required().description('Security token ID to validate'),
                    }),
                },
            }
        },
        {
            method: 'PATCH',
            path: '/update/{id}',
            options: {
                handler: tokenToMysqlController.update,
                description: 'Edit token',
                notes: 'Allows the user to edit a security token for testing purposes.',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string().required().description('Security token ID to validate'),
                    }),
                    payload: Joi.object({
                        tokenValue: Joi.string().required().description('New value for the security token')
                    })
                }
            }
        }
    ]

    return tokensRoutes
}