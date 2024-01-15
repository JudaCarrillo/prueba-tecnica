export class TokenController {
    static apiUrlGen = 'http://localhost:3000/generate'

    // generate token 
    static async generateToken() {
        try {
            const response = await fetch(TokenController.apiUrlGen, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const token = await response.json()
            return token

        } catch (err) {
            console.log(err);
        }
    }

    // validate token
    static async validateToken({ id }) {
        const idToken = id
        const apiUrlVld = `http://localhost:3000/validate/${idToken}`

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