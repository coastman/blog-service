import { Injectable } from '@nestjs/common';
import { ArticleService } from '../article/article.service';
import { TagService } from '../tag/tag.service';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class StatisticService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly tagService: TagService,
    private readonly commentService: CommentService,
  ) {}

  async statistic() {
    const hotStatistic = await this.articleService.hotList();
    const tagStatistic = await this.tagService.findAllAndCount();
    const commentStatistic = await this.commentService.count();

    return {
      hotStatistic,
      tagStatistic,
      commentStatistic,
    };
  }
}
