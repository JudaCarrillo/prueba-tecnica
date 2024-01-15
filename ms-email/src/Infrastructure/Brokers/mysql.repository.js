import mysql from 'mysql2/promise';
import { MailRepository } from '../../Domain/index.js';
import { envConfigMysql } from '../Config/config.js';


export class MySQLMailRepository extends MailRepository {

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

    async save({ recipient, subject, content }) {
        const query = 'INSERT INTO email_sent (recipient, subject, content) VALUES (?, ?, ?)';
        const [isSent] = await this.pool.query(query, [recipient, subject, content]);
        return isSent;
    }
}