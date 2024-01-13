import { TokenController } from '../controllers/token.controller.js';

export const createTokenRoutes = ({ tokenModel }) => {
    const tokenController = new TokenController(tokenModel);

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