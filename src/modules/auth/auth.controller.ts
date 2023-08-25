import { Req, Controller, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('publicKey')
  async getPublicKey() {
    return this.configService.get<string>('PUBLIC_KEY');
  }

  @Post('login')
  async login(@Req() request: Request) {
    return await this.authService.validateUser(
      request.body.account,
      request.body.password,
    );
  }
}
