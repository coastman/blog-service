import { Req, Controller, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Get('publicKey')
  async getPublicKey() {
    return this.configService.get<string>('PUBLIC_KEY');
  }

  @Public()
  @Post('login')
  async login(@Req() request: Request) {
    return await this.authService.validateUser(
      request.body.account,
      request.body.password,
    );
  }
}
