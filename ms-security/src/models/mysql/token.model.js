import mysql from 'mysql2/promise';
import Crypto, { randomUUID } from 'crypto';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'MS_SECURITY'
}
const connection = mysql.createPool(config);

export class TokenModel {

    static async generate() {
        const token = Crypto.randomBytes(4).toString('hex');
        const uuid = randomUUID();
        const objToken = { 'id': uuid, 'token': token };

        return objToken
    }

    static async insertToken({ newToken }) {
        const { id, token } = newToken
        const query = 'INSERT INTO Security_Token (id_security_token, token) VALUES (?, ?)';
        try {
            await connection.query(query, [id, token]);
        } catch (err) {
            console.error(err);
        }

        return token;
    }

    static async validate({ id }) {
        const querySelect = 'SELECT id_security_token, used FROM Security_Token WHERE id_security_token = ?';
        const queryUpdate = 'UPDATE Security_Token SET used = 1 WHERE id_security_token = ?';

        try {
            const [token] = await connection.query(querySelect, [id]);

            if (token.length > 0) {
                const used = token[0].used
                if (used === 1) {
                    return false
                }

                await connection.query(queryUpdate, [id])
                return true
            } else {
                return false
            }

        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async update({ id, newToken }) {
        const isValid = await TokenModel.validate({ id });
        if (!isValid) {
            return false
        }

        const query = 'UPDATE Security_Token SET token = ? WHERE id_security_token = ?';
        const [updatedToken] = await connection.query(query, [newToken, id]);

        const isUpdated = updatedToken.affectedRows > 0 ? true : false
        return isUpdated
    }
} 
