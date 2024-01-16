export class ClientGlobalParamsService {
    constructor(ClientGlobalParamRepository) {
        this.ClientGlobalParamRepository = ClientGlobalParamRepository;
    }

    async saveClient({ id, email, password }) {
        const isRegistedClient = await this.ClientGlobalParamRepository.saveClient({ id, email, password })
        return isRegistedClient
    }

    async saveGlobalParams({ idClient, sendEmail }) {
        const isRegistedParam = await this.ClientGlobalParamRepository.saveGlobalParams({ idClient, sendEmail })
        return isRegistedParam
    }
}