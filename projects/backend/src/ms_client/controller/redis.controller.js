import { RedisModel } from '../models/redis.models.js'

export class RedisController {
    redisModel = new RedisModel();

    constructor() {
        RedisModel.connection();
    }

    static async saveValues({ key, value }) {
        // validaciones...
        const isValid = await RedisModel.setValue({ key, value });
        const label = isValid === 'OK' ? 'Clave establecida' : 'Clave no establecida'
        return label
    }

    static async getValues({ key }) {
        const value = await RedisModel.getValue({ key })
        if (value) return value
    }
}
