import { RedisRepository } from '../../Persistence/reddis.repository.js';
import { validateGlobalParams } from '../../Schemes/globalParams.js';

export class RedisController {

    constructor(redisRepository) {
        this.redisRepository = redisRepository;
    }

    async saveValues({ key, value }) {
        const validationResult = validateGlobalParams({ key, value })
        if (!validationResult.success) return validationResult.error

        const isValid = await this.redisRepository.setValues({ key, value });
        const label = isValid === 'OK' ? 'Clave establecida' : 'Clave no establecida'
        return label
    }

    async getValues({ key }) {
        const value = await this.redisRepository.getValues({ key })
        if (value) return value
    }
}
