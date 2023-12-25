import { Injectable } from '@nestjs/common';

import { Message } from './message.entity';
import { MessageDto } from './message.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
    private messages: Message[] = [];

    constructor(private userService: UserService) {}

    public getSingle(messageId: string): Message {
        const message = this.messages.find(({ id }) => id === messageId);

        if (!message) {
            throw new Error(`Message with '${messageId}' not found.`);
        }

        return message;
    }

    public getMany(): Message[] {
        return this.messages;
    }

    public create(messagePayload: MessageDto): Message {
        const { sender, body } = messagePayload;

        const user = this.userService.getSingle(sender);

        if (!user) {
            throw new Error(`User with name '${sender}' does not exist.`);
        }

        const message = new Message(sender, body);
        this.messages.push(message);

        return message;
    }
}
