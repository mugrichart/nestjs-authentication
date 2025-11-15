import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
}

// FIXME: This is a mockup, replace with a real db
const users: User[] = [
    {
        userId: 1,
        username: 'Alice',
        password: 'topsecret',
    },
    {
        userId: 2,
        username: 'Bob',
        password: 'hidden',
    },

]

@Injectable()
export class UsersService {
    async findUserByName(username: string): Promise<User | undefined> {
        return users.find((user) => user.username === username)
    }
}
