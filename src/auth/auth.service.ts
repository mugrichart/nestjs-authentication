import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

type AuthInput = { 
    username: string;
    password: string;
}

type SigninData = {
    userId: number;
    username: string;
}

type AuthResult = {
    accessToken: string;
    userId: number;
    username: string;
}

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateuser(input)
        if (!user) throw new UnauthorizedException();

        return {
            accessToken: 'fake-access',
            userId: user.userId,
            username: user.username
        }
    }

    async validateuser(input: AuthInput): Promise<SigninData | null> {
        const user = await this.usersService.findUserByName(input.username);
        if (user && user.password === input.password) {
            return { userId: user.userId, username: user.username }
        }
        return null;
    }
}
