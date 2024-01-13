import { RedisModel } from '../models/redis.models.js'

export class RedisController {
    redisModel = new RedisModel();

    constructor() {
        RedisModel.connection();
    }

    async init() {
        this.redisModel = new RedisModel();
        await this.redisModel.connection();
    }

    async saveValues(request, h) {
        const key = request.payload.key
        const value = request.payload.value
        const isValid = await RedisModel.setValue({ key, value });
        const label = isValid === 'OK' ? 'Clave establecida' : 'Clave no establecida'
        return h.response(label)
    }

    async getValues(request, h) {
        const key = request.params.key
        const value = await RedisModel.getValue({ key })
        if (value) return h.response(value)
    }
}
