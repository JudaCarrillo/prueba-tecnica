import { TokenAdapter } from '../adapters/token.adapter.js';

export const createTokenRoutes = () => {
    const tokenController = new TokenAdapter();

    const tokensRoutes = [
        {
            method: 'GET',
            path: '/generate',
            handler: tokenController.generate
        },
        {
            method: 'GET',
            path: '/validate/{id}',
            handler: tokenController.validate
        },
        {
            method: 'PATCH',
            path: '/edit/{id}',
            handler: tokenController.update
        }
    ]

    return tokensRoutes
}