/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Req,
  Res,
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/user.model';
const NodeRSA = require('node-rsa');
const bcrypt = require('bcryptjs');

@Controller('rsa')
export class RsaController {
  dencrypt: any;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly configService: ConfigService,
  ) {
    this.dencrypt = new NodeRSA(this.configService.get<string>('PRIVATE_KEY'));
    this.dencrypt.setOptions({ encryptionScheme: 'pkcs1' });
  }

  @Get()
  async getPublicKey() {
    return this.configService.get<string>('PUBLIC_KEY');
  }

  @Post()
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userModel.findOne({
      where: {
        account: (request.body as any).account,
      },
    });

    console.log('------> request.signedCookies: ', request.signedCookies);

    if (!user) {
      throw new HttpException(
        'this user is not existed',
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = this.dencrypt.decrypt(
      (request.body as any).password,
      'utf8',
    );
    const bool = bcrypt.compareSync(password, user.password);
    if (bool) {
      response.cookie('user', user.account, { signed: true, httpOnly: true });
      return {};
    }
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync('123', salt);
    // console.log(hash);
    throw new HttpException(
      'this user is not existed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
