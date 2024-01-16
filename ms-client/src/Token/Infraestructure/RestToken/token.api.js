import { Token } from '../../Domain/index.js';
import { endPoints } from '../Config/config.js'

export class APIRestToken {

    apiUrlGen;
    apiUrlVld;

    constructor() {
        this.apiUrlGen = endPoints.API_GENERATE
        this.apiUrlVld = endPoints.API_VALIDATE
    }

    async generateToken() {
        try {
            const response = await fetch(this.apiUrlGen, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const tokenData = await response.json()
            const token = new Token(tokenData.idToken, tokenData.token);
            return token

        } catch (err) {
            console.log(err);
        }
    }

    async validateToken({ idToken }) {
        const apiUrlVld = `${this.apiUrlVld}${idToken}`

        try {
            const response = await fetch(apiUrlVld, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const isValidated = await response.json()
            return isValidated

        } catch (err) {
            console.error(err);
        }
    }

}