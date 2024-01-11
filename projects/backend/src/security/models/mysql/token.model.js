import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'ms_security'
}

const connection = mysql.createPool(config);

export class TokenModel {
    

    static async getAll() {
        const [tokens] = await connection.query(
            'select id, token from security_token'
        )
        return tokens
    }

    static async getById({ id }) {
        const [token] = await connection.query(
            'select id, token from security_token where id = ?', [id]
        )
        return token
    }
} 
