import Crypto, { randomUUID } from 'crypto';

const tokens = [];
export class TokenModel {

    static async generate() {
        const token = Crypto.randomBytes(4).toString('hex');
        const uuid = randomUUID();
        const objToken = { 'id': uuid, 'token': token };

        return objToken
    }

    static async insertToken({ token }) {
        tokens.push(token);
        return token;
    }

    static async validate({ id }) {
        const isValidToken = tokens.some((token) => token.id == id)
        return isValidToken ? 'Token válido' : 'Token inválido'
    }

    static async update({ id, newToken }) {
        const index = tokens.findIndex((token) => token.id === id);

        if (index === -1) return 'Token no encontrado';
        tokens[index].token = newToken;

        return {
            message: 'Token actualizado exitosamente',
            updatedToken: newToken
        };
    }
}