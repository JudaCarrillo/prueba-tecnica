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
        const query = 'INSERT INTO security_token (id_security, token) VALUES (?, ?)';
        try {
            await connection.query(query, [id, token]);
        } catch (err) {
            console.error(err);
        }

        return token;
    }

    static async validate({ id }) {
        const query = 'SELECT id FROM security_token WHERE id_security = ?';
        try {
            const [token] = await connection.query(query, [id]);
            return token.length > 0 ? true : false
        } catch (err) {
            console.error(err)
        }

    }

    static async update({ id, newToken }) {
        const isValid = await TokenModel.validate({ id });
        if (!isValid) return false

        const query = 'UPDATE security_token SET token = ? WHERE id_security = ?';
        const [updatedToken] = await connection.query(query, [newToken, id]);

        return updatedToken.affectedRows > 0 ? true : false
    }
} 
