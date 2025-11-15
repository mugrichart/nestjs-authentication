import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateuser(input)
        if (!user) throw new UnauthorizedException();

        return this.signIn(user)
    }

    async validateuser(input: AuthInput): Promise<SigninData | null> {
        const user = await this.usersService.findUserByName(input.username);
        if (user && user.password === input.password) {
            return { userId: user.userId, username: user.username }
        }
        return null;
    }

    async signIn(user: SigninData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username
        }

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return { accessToken, username: user.username, userId: user.userId }
    }
}
