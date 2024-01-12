import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'ms_mails'
}

const conn = mysql.createPool(config)

export const registerMails = async ({ recipient, subject, content }) => {
    const query = 'INSERT INTO email_sent (recipient, subject, content) VALUES (?, ?, ?)';
    const [isSent] = await conn.query(query, [recipient, subject, content]);

    return isSent ? true : false;
}