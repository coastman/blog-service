import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { ArticleModule } from './modules/article/article.module';
import { LoggerMiddleware } from './middlewares/log.middleware';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'blog',
      autoLoadModels: true,
      define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        underscored: true,
        freezeTableName: true,
      },
      timezone: '+08:00',
    }),
    CategoryModule,
    TagModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
