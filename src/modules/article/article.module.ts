import { Article } from './article.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { FileModule } from '../file/file.module';
import { LikeModule } from '../like/like.module';

const articleModel = SequelizeModule.forFeature([Article]);

@Module({
  imports: [articleModel, TagModule, CategoryModule, FileModule, LikeModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService, articleModel],
})
export class ArticleModule {}
