import { Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { TagModule } from '../tag/tag.module';
import { CommentModule } from '../comment/comment.module';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  imports: [ArticleModule, TagModule, CommentModule],
  controllers: [StatisticController],
  providers: [StatisticService],
  exports: [StatisticService],
})
export class StatisticModule {}
