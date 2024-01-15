export class MailRepository {
    constructor() {
        if (this.constructor === MailRepository) {
            throw new Error('MailRepository is an abstract class and cannot be instantiated directly.');
        }
    }

    

    save(mail) {
        throw new Error('save method must be implemented by subclasses.');
    }
}