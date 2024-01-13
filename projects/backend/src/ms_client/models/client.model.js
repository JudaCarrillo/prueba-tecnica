import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'MS_CLIENT'
}

const conn = mysql.createPool(config)

export class ClientModel {

    static async registerClient({ id, email, password }) {
        const query = 'INSERT INTO Client (id_client, email, password) VALUES (?, ?, ?)'

        try {
            await conn.query(query, [id, email, password])
            return true
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async registerGlobalParameter({ idClient, sendEmail }) {
        const query = 'INSERT INTO Global_Parameter (id_client, send_email) VALUES (?, ?)'

        try {
            await conn.query(query, [idClient, sendEmail])
            return true
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

