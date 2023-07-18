import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeRSA = require('node-rsa');

@Controller('rsa')
export class RsaController {
  dencrypt: any;
  constructor(private readonly configService: ConfigService) {
    this.dencrypt = new NodeRSA(this.configService.get<string>('PRIVATE_KEY'));
    // const text = this.dencrypt.decrypt(
    //   'hpDNTv85YSuk1pgqzlUT4RkzRIMAjmqjrkFv0gO6dFCLpGboLlxYnJYBjLHaeVzzNK9HaZv4f6aGI45FaLNWLA==',
    //   'utf8',
    // );
    // console.log('text: --->', text);
  }

  @Get()
  async getPublicKey() {
    return this.configService.get<string>('PUBLIC_KEY');
  }
}
