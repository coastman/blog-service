import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Cache } from 'cache-manager';

@Injectable()
export class ScheduleService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Cron('0 0 0 * * *')
  handleCron() {
    this.cacheManager.set('blog:article:view-count', 0, 0);
  }
}
