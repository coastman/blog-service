import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

const userModel = SequelizeModule.forFeature([User]);
@Module({
  imports: [userModel],
  exports: [userModel],
})
export class UserModule {}
