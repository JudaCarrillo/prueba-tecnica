import { createClient } from 'redis';
import { envConfigRedis } from '../Config/config.js'

export class RedisRepository {
    client;

    constructor() {
        this.connect();
    }

    async connect() {
        this.client = await createClient({
            host: envConfigRedis.REDIS_HOST,
            port: envConfigRedis.REDIS_PORT,
        })
            .on('error', err => console.log('Redis client error:', err))
            .connect()
    }

    async setValues({ key, value }) {
        const isValid = await this.client.set(key, value);
        return isValid
    }

    async getValues({ key }) {
        const keyFromRedis = await this.client.get(key);
        return keyFromRedis
    }

    async closeConn() {
        this.client.quit();
    }
}
