import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSignInDto } from './dto/signin.dto';
import { CreateSignUpDto } from './dto/signup.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Throttle({
        default: { limit: 1, ttl: 1000 }
    })
    @Post('/signup')
    signUp(@Body() signUpDto: CreateSignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Throttle({
        default: { limit: 1, ttl: 1000 }
    })
    @Post('/signin')
    signIn(@Body() loginDto: CreateSignInDto): Promise<{ token: string }> {
        return this.authService.signIn(loginDto);
    }
}