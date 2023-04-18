import { Module, CacheModule } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: async () =>
        await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      isGlobal: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class AppCacheModule {}
