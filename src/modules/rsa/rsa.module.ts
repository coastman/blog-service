import { Module } from '@nestjs/common';
import { RsaController } from './rsa.controller';

@Module({
  controllers: [RsaController],
})
export class RsaModule {}
