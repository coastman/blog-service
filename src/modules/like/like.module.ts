import { Like } from './like.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { LikeService } from './like.service';

@Module({
  imports: [SequelizeModule.forFeature([Like])],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
