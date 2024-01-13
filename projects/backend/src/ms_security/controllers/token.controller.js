export class TokenController {
    constructor(tokenModel) {
        this.tokenModel = tokenModel;
    }

    generate = async (request, h) => {
        const objToken = await this.tokenModel.generate();
        const { token } = objToken;

        await this.tokenModel.insertToken({ newToken: objToken });
        return h.response(objToken);
    }

    validate = async (request, h) => {
        const idToken = request.params.id;
        const isValid = await this.tokenModel.validate({ id: idToken });

        const responseObj = {
            label: 'Valid token',
            isValid: isValid
        };

        return h.response(responseObj);
    }

    update = async (request, h) => {
        const idToken = request.params.id;
        const newToken = request.payload.token;

        const isValid = await this.tokenModel.update({ id: idToken, newToken: newToken });
        const label = isValid ? 'Successfully updated' : 'Not updated successfully';

        return h.response(label);
    }
}