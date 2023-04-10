import { Article } from './article.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Article]),
    TagModule,
    CategoryModule,
    FileModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
