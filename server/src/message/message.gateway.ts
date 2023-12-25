import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';
import { MessageDto } from './message.dto';

@WebSocketGateway(5002, { cors: '*' })
export class MessageGateway {
    @WebSocketServer() server: Server;

    constructor(
        private messagesService: MessageService,
        private userService: UserService,
    ) {}

    @SubscribeMessage('message')
    handleMessage(@MessageBody() messageDto: MessageDto): void {
        const message = this.messagesService.create(messageDto);
        this.server.emit('message', message);
    }

    @SubscribeMessage('user')
    handleUser(@MessageBody() userDto: UserDto): void {
        const user = this.userService.create(userDto);
        this.server.emit('user', user);
    }
}
