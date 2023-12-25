import { Module } from '@nestjs/common';

import { UserService } from './user/user.service';
import { MessageService } from './message/message.service';
import { MessageGateway } from './message/message.gateway';

@Module({
    providers: [UserService, MessageService, MessageGateway],
})
export class AppModule {}
