import mysql from 'mysql2/promise'

export class MailRepository {

    config = {}
    pool;

    constructor() {
        this.config = {
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: '',
            database: 'MS_MAIL'
        }

        this.connect()
    }

    async connect() {
        this.pool = mysql.createPool(this.config);
    }

    async registerEmail({ recipient, subject, content }) {
        const query = 'INSERT INTO email_sent (recipient, subject, content) VALUES (?, ?, ?)';
        const [isSent] = await this.pool.query(query, [recipient, subject, content]);
        return isSent;
    }
}
