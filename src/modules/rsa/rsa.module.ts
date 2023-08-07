import { Module } from '@nestjs/common';
import { RsaController } from './rsa.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RsaController],
})
export class RsaModule {}
