import { Token } from '../Domain/index.js'

export class TokenService {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    async generateToken() {
        const newTokenData = await this.tokenRepository.generate();
        const newToken = new Token(newTokenData.id, newTokenData.token);

        newToken.idToken
        newToken.token

        await this.tokenRepository.save({ newToken });
        return newToken;
    }

    async validateToken({ idToken }) {
        const isValid = await this.tokenRepository.validate({ idToken });
        return isValid;
    }

    async updateToken({ idToken, tokenValue }) {
        const isUpdated = await this.tokenRepository.update({ idToken, tokenValue });
        return isUpdated;
    }
}
