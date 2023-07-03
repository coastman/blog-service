import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { ArticleService } from '../article/article.service';
import { TagService } from '../tag/tag.service';
import { CommentService } from '../comment/comment.service';
import { Cache } from 'cache-manager';

@Injectable()
export class StatisticService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly tagService: TagService,
    private readonly commentService: CommentService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async statistic() {
    const [hotStatistic, tagStatistic, commentStatistic, todayViewCount] =
      await Promise.all([
        this.articleService.hotList(),
        this.tagService.findAllAndCount(),
        this.commentService.count(),
        this.cacheManager.get('blog:article:view-count'),
      ]);
    return {
      hotStatistic,
      tagStatistic,
      commentStatistic,
      todayViewCount,
    };
  }
}
