export class TokenRepository {
    constructor() {
        if (this.constructor === TokenRepository) {
            throw new Error('MailRepository is an abstract class and cannot be instantiated directly.');
        }
    }

    save({ newToken }) {
        throw new Error('save method must be implemented by subclasses.');
    }

    validate({ idToken }) {
        throw new Error('save method must be implemented by subclasses.');
    }

    update({ idToken, newToken }) {
        throw new Error('save method must be implemented by subclasses.');
    }
}