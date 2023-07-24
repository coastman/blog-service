import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeRSA = require('node-rsa');

@Controller('rsa')
export class RsaController {
  dencrypt: any;
  constructor(private readonly configService: ConfigService) {
    this.dencrypt = new NodeRSA(this.configService.get<string>('PRIVATE_KEY'));
    this.dencrypt.setOptions({ encryptionScheme: 'pkcs1' });
    // const text = this.dencrypt.decrypt(
    //   'BumRdDljHxsuuI1bVZGnALFc8GEztd1iCviZIgXVgfprvtAPHB3j1gmkubZizNqvx2txUMLQtF2TRGEDDvYUvg==',
    //   'utf8',
    // );
    // console.log('text: --->', text);
  }

  @Get()
  async getPublicKey() {
    return this.configService.get<string>('PUBLIC_KEY');
  }

  @Post()
  async login(@Body() body: any) {
    console.log('password: --->', body.password);
    const text = this.dencrypt.decrypt(body.password, 'utf8');
    console.log('text: --->', text);
    return {};
  }
}
