import mysql from 'mysql2/promise';
import { envConfigMysql } from '../Config/config.js';
import { ClientGlobalParamRepository } from '../../Domain/index.js';

export class MySQLClientGlobalParamRepository extends ClientGlobalParamRepository {

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

    async saveClient({ id, email, password }) {
        const query = 'INSERT INTO Client (id_client, email, password) VALUES (?, ?, ?)'

        try {
            await this.pool.query(query, [id, email, password])
            return true
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async saveGlobalParams({ idClient, sendEmail }) {
        const query = 'INSERT INTO Global_Parameter (id_client, send_email) VALUES (?, ?)'

        try {
            await this.pool.query(query, [idClient, sendEmail])
            return true
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}