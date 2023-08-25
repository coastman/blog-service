/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../user/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
const NodeRSA = require('node-rsa');
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  dencrypt: any;
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.dencrypt = new NodeRSA(this.configService.get<string>('PRIVATE_KEY'));
    this.dencrypt.setOptions({ encryptionScheme: 'pkcs1' });
  }

  async validateUser(account: string, password: string): Promise<any> {
    console.log(account, password);
    const user = await this.userModel.findOne({
      where: { account },
    });

    if (!user) {
      throw new HttpException(
        'this user is not existed',
        HttpStatus.BAD_REQUEST,
      );
    }
    const value = this.dencrypt.decrypt(password, 'utf8');
    const success = bcrypt.compareSync(value, user.password);
    if (success) {
      const payload = { account: user.account, sub: user.id };
      return {
        token: this.jwtService.sign(payload),
      };
      // return success;
    }
    throw new HttpException(
      'this user is not existed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
