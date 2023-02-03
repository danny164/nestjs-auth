import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { RefreshToken } from './decorators/refresh-token.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('authentication')
@ApiTags('authentication')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async signIn(@Res({ passthrough: true }) response: Response, @Body() signInDto: SignInDto) {
        const accessToken = await this.authService.signIn(signInDto);

        response.cookie('authCookie', accessToken, { secure: true, httpOnly: true, sameSite: true });
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-tokens')
    async refreshTokens(
        @Res({ passthrough: true }) response: Response,
        @RefreshToken() refreshToken: string
    ) {
        const accessToken = await this.authService.refreshTokens(refreshToken);

        response.cookie('authCookie', accessToken, { secure: true, httpOnly: true, sameSite: true });
    }
}
