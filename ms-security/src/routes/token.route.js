import Joi from 'joi';
import { TokenAdapter } from '../adapters/token.adapter.js';

export const createTokenRoutes = () => {
    const tokenController = new TokenAdapter();

    const tokensRoutes = [
        {
            method: 'GET',
            path: '/generate',
            options: {
                handler: tokenController.generate,
                description: 'Generate token',
                notes: 'Generates a security token of 8 digits.',
                tags: ['api'],
            }
        },
        {
            method: 'GET',
            path: '/validate/{id}',
            options: {
                handler: tokenController.validate,
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
            path: '/edit/{id}',
            options: {
                handler: tokenController.update,
                description: 'Edit token',
                notes: 'Allows the user to edit a security token for testing purposes.',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string().required().description('Security token ID to validate'),
                    }),
                    payload: Joi.object({
                        newTokenValue: Joi.string().required().description('New value for the security token')
                    })
                }
            }
        }
    ]

    return tokensRoutes
}