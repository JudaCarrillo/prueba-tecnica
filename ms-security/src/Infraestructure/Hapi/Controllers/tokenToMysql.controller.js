import { validatePartialToken } from '../../Schemes/token.js';
import { TokenService } from '../../../Application/token.services.js';

export class TokenToMysqlController {

    constructor(mysqlRepository) {
        this.mysqlRepository = mysqlRepository;
        this.tokenService = new TokenService(this.mysqlRepository)
    }

    generate = async (request, h) => {
        const newToken = await this.tokenService.generateToken();
        return h.response(newToken);
    }

    validate = async (request, h) => {
        const validationResult = validatePartialToken(request.params)

        if (validationResult.error) {
            return h.response({ error: 'Invalid parameters.' }).code(400);
        }

        const { id } = validationResult.data
        const isValid = await this.tokenService.validateToken({ idToken: id });

        return h.response({ 'Valid token': isValid });
    }

    update = async (request, h) => {
        const paramValidationResult = validatePartialToken(request.params)
        const bodyValidationResult = validatePartialToken(request.payload)

        if (!bodyValidationResult.success || !paramValidationResult.success) {
            return h.response({ error: 'Invalid parameters.' }).code(400);
        }

        const { id } = paramValidationResult.data
        const { tokenValue } = bodyValidationResult.data

        const isUpdated = await this.tokenService.updateToken({ idToken: id, tokenValue });
        const label = isUpdated ? 'Successfully updated' : 'Not updated successfully';

        return h.response({ 'Is updated': label });
    }
}