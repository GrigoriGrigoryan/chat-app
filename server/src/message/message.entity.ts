import { v4 as uuid } from 'uuid';

export class Message {
    id: string;
    sender: string;
    body: string;
    createdAt: string;

    constructor(sender: string, text: string) {
        this.id = uuid();
        this.sender = sender;
        this.body = text;
        this.createdAt = new Date(Date.now()).toLocaleString('en-US');
    }
}
