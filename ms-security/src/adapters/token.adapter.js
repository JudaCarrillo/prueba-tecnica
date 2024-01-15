import { TokenModel } from "../models/mysql/token.model.js";
import { validatePartialToken } from "../schemes/token.js";

export class TokenAdapter {
    tokenModel = new TokenModel()

    generate = async (request, h) => {
        const newToken = await TokenModel.generate();
        await TokenModel.insertToken({ newToken });
        return h.response(newToken);
    }

    validate = async (request, h) => {
        const validationResult = validatePartialToken(request.params)

        if (validationResult.error) {
            return h.response({ error: 'Invalid parameters.' }).code(400);
        }

        const { id } = validationResult.data
        const isValid = await TokenModel.validate({ id });

        return h.response({ 'Valid token': isValid });
    }

    update = async (request, h) => {
        const paramValidationResult = validatePartialToken(request.params)
        const bodyValidationResult = validatePartialToken(request.payload)

        if (bodyValidationResult.error || paramValidationResult.error) {
            return h.response({ error: 'Invalid parameters.' }).code(400);
        }

        const { id } = paramValidationResult.data
        const { token } = bodyValidationResult.data

        const isUpdated = await TokenModel.update({ id, newToken: token });
        const label = isUpdated ? 'Successfully updated' : 'Not updated successfully';

        return h.response({ 'Is updated': label });
    }
}