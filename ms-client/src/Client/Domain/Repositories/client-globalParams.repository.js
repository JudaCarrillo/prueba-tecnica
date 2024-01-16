export class ClientGlobalParamRepository {
    constructor() {
        if (this.constructor === ClientGlobalParamRepository) {
            throw new Error('MailRepository is an abstract class and cannot be instantiated directly.');
        }
    }

    saveClient({ id, email, password }) {
        throw new Error('save method must be implemented by subclasses.');
    }

    saveGlobalParams({ idClient, sendEmail }) {
        throw new Error('save method must be implemented by subclasses.');
    }
}