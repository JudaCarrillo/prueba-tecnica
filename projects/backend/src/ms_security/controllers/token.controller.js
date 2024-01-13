export class TokenController {
    constructor(tokenModel) {
        this.tokenModel = tokenModel;
    }

    generate = async (request, h) => {
        const objToken = await this.tokenModel.generate();
        const { token } = objToken;
        await this.tokenModel.insertToken({ newToken: objToken });
        return h.response(token);
    }

    validate = async (request, h) => {
        const idToken = request.params.id;
        const isValid = await this.tokenModel.validate({ id: idToken });
        const label = isValid ? 'Valid token' : 'Invalid token';
        return h.response(label);

    }

    update = async (request, h) => {
        const idToken = request.params.id;
        const newToken = request.payload.token;

        const isValid = await this.tokenModel.update({ id: idToken, newToken: newToken });
        const label = isValid ? 'Successfully updated' : 'Not updated successfully';

        return h.response(label);
    }
}