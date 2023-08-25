import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppCacheModule } from './modules/cache/cache.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { ArticleModule } from './modules/article/article.module';
import { CommentModule } from './modules/comment/comment.module';
import { LikeModule } from './modules/like/like.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { UserModule } from './modules/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleModule as Schedule } from './modules/schedule/schedule.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './middlewares/log.middleware';
import { join } from 'path';

@Module({
  imports: [
    AppCacheModule,
    ScheduleModule.forRoot(),
    Schedule,

    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.get<string>('MYSQL_HOST'),
          username: configService.get<string>('MYSQL_USERNAME'),
          password: configService.get<string>('MYSQL_PASSWORD'),
          database: configService.get<string>('MYSQL_DATABASE'),
          port: configService.get<number>('MYSQL_PORT'),
          autoLoadModels: true,
          define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            underscored: true,
            freezeTableName: true,
          },
          timezone: '+08:00',
          dialect: 'mysql',
        };
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    CategoryModule,
    TagModule,
    ArticleModule,
    CommentModule,
    LikeModule,
    StatisticModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
