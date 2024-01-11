export class TokenController {
    constructor(tokenModel) {
        this.tokenModel = tokenModel;
    }

    generate = async (request, h) => {
        const objToken = await this.tokenModel.generate();
        const { token } = objToken;
        await this.tokenModel.insertToken({ token: objToken });
        return h.response(token).code(200);
    }

    validate = async (request, h) => {
        const idToken = request.params.id;
        const label = await this.tokenModel.validate({ id: idToken });
        return h.response(label);

    }

    update = async (request, h) => {
        const idToken = request.params.id;
        const newToken = request.payload.token;

        const updatedToken = await this.tokenModel.update({ id: idToken, newToken: newToken });

        return h.response(updatedToken);
    }
}