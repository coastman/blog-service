import { Comment } from './comment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [SequelizeModule.forFeature([Comment]), ArticleModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
