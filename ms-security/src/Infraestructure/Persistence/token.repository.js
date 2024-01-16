import Crypto, { randomUUID } from 'crypto';
import mysql from 'mysql2/promise';
import { TokenRepository } from '../../Domain/index.js';
import { envConfigMysql } from '../Hapi/Config/config.js';


export class MySQLTokenRepository extends TokenRepository {

    config = {}
    pool;

    constructor() {
        super()
        this.config = {
            host: envConfigMysql.DB_HOST,
            user: envConfigMysql.DB_USER,
            port: envConfigMysql.DB_PORT,
            password: envConfigMysql.DB_PASSWORD,
            database: envConfigMysql.DB_NAME
        }

        this.connect()
    }

    async connect() {
        this.pool = mysql.createPool(this.config);
    }

    async generate() {
        const token = Crypto.randomBytes(4).toString('hex');
        const uuid = randomUUID();
        return { 'id': uuid, 'token': token }
    }

    async save({ newToken }) {
        const { idToken, token } = newToken
        const query = 'INSERT INTO Security_Token (id_security_token, token) VALUES (?, ?)';
        try {
            await this.pool.query(query, [idToken, token]);
        } catch (err) {
            console.error(err);
        }

        console.log('Token registered successfully')

        return token;
    }

    async validate({ idToken }) {
        const querySelect = 'SELECT id_security_token, used FROM Security_Token WHERE id_security_token = ?';
        const queryUpdate = 'UPDATE Security_Token SET used = 1 WHERE id_security_token = ?';

        try {
            const [token] = await this.pool.query(querySelect, [idToken]);

            if (token.length > 0) {
                const used = token[0].used
                if (used === 1) {
                    console.log('Invalid token');
                    return false
                }

                await this.pool.query(queryUpdate, [idToken])
                console.log('Valid token')
                return true
            } else {
                console.log('There is not token')
                return false
            }

        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async update({ idToken, tokenValue }) {
        const querySelect = 'SELECT id_security_token, used FROM Security_Token WHERE id_security_token = ?';
        const queryUpdate = 'UPDATE Security_Token SET token = ? WHERE id_security_token = ?';

        try {
            const [token] = await this.pool.query(querySelect, [idToken]);

            if (token.length > 0) {
                tokenExists = true;
            } else {
                console.log('There is not token')
                return false
            }
        } catch (err) {
            console.error(err)
            throw err
        }


        try {
            const [updatedToken] = await this.pool.query(queryUpdate, [tokenValue, idToken]);

            const isUpdated = updatedToken.affectedRows > 0 ? true : false
            console.log('Token successfully updated')
            return isUpdated

        } catch (err) {
            console.error(err)
            throw err
        }
    }
} 
