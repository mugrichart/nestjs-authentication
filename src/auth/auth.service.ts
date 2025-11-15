import { Injectable } from '@nestjs/common';

type AuthInput = { 
    username: string;
    password: string;
}

type SigninData = {
    userId: number;
    username: string;
}

@Injectable()
export class AuthService {
    async validateuser(input: AuthInput): Promise<SigninData | null> {
        return null;
    }
}
