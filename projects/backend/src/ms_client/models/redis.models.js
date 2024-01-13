import { createClient } from "redis";

export class RedisModel {
    client = null

    static async connection() {
        this.client = createClient({
            host: 'redis',
            port: 8001,
        });

        this.client.on('error', err => console.log('Redis client error:', err));

        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });

        this.client.connect()
    }

    static async setValue({ key, value }) {
        const isValid = await this.client.set(key, value);
        return isValid
    }

    static async getValue({ key }) {
        const keyFromRedis = await this.client.get(key);
        return keyFromRedis
    }

    async closeConn() {
        this.client.quit();
    }
}
