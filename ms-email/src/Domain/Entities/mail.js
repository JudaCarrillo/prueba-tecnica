export class Mail {
    constructor(subject, recipient, content, sender,) {
        this.subject = subject;
        this.recipients = recipient;
        this.content = content;
        this.sender = sender;
        this.sentDate = new Date();
    }
}

