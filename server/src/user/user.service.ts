import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    private users: User[] = [];

    public getSingle(username: string): User | undefined {
        return this.users.find(({ name }) => name === username);
    }

    public create(userPayload: UserDto): User {
        const { name } = userPayload;

        const existingUser = this.getSingle(name);

        if (existingUser) {
            throw new Error(`User with name '${existingUser}' already exists.`);
        }

        const user = new User(name);
        this.users.push(user);

        return user;
    }
}
