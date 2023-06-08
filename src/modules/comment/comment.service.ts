import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comment } from './comment.model';
import { Article } from '../article/article.model';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { LikeService } from '../like/like.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: typeof Article,
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
    private readonly likeService: LikeService,
  ) {}

  async findPage(query) {
    const where: any = {
      [Op.or]: {
        content: {
          [Op.like]: `%${query.keyword}%`,
        },
        commentator: {
          [Op.like]: `%${query.keyword}%`,
        },
      },
    };

    if (query.status) where.status = query.status;

    const list =
      (await this.commentModel.findAll({
        offset: (query.page - 1) * query.pageSize,
        limit: parseInt(query.pageSize),
        where,
        order: [['createdAt', 'DESC']],
        raw: true,
      })) || [];
    const total = await this.commentModel.count();
    return {
      list,
      total,
    };
  }

  async create(body) {
    if (!body.commentatorId) {
      const commentatorId = uuidv4();
      body.commentatorId = commentatorId;
    }
    if (body.articleId) {
      await this.articleModel.increment('commentCount', {
        where: { id: body.articleId },
      });
    }
    const result = await this.commentModel.create(body);
    return {
      result,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByArticle(id: number) {
    const commentList = (
      await this.commentModel.findAll({
        where: { articleId: id },
        order: [['createdAt', 'DESC']],
      })
    ).map((model) => model.get({ plain: true }));

    const commentMap = {};
    commentList.forEach((item) => {
      commentMap[item.id] = item;
    });

    const list = [];
    commentList.forEach((comment) => {
      const parent = commentMap[comment.parentId];
      if (parent) (parent.children || (parent.children = [])).push(comment);
      else list.push(comment);
    });

    list.sort((a, b) => b.createdAt - a.createdAt);

    const treeToList = (list) => {
      const ret = [];
      const stack = list;
      while (stack.length) {
        const node = stack.pop();
        ret.push(node);
        if (node.children) {
          node.children.forEach((item) => {
            stack.push(item);
          });
          delete node.children;
        }
      }
      return ret;
    };

    list.forEach((item) => {
      if (item.children) {
        item.children = treeToList(item.children);
        item.children.sort((a, b) => a.createdAt - b.createdAt);
      }
    });

    return { list };
  }

  async updateById(body: any, id: number) {
    const isExist = await this.commentModel.findByPk(id);
    if (!isExist) {
      throw new HttpException(
        'this comment is not existed',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.commentModel.update({ status: body.status }, { where: { id } });
    return { result: id };
  }

  async liking(params) {
    const resList = await Promise.all([
      this.commentModel.increment('likeCount', {
        where: { id: params.refId },
      }),
      this.likeService.liking(params),
    ]);
    return { result: resList[1] };
  }

  async count() {
    const count = await this.commentModel.count();
    return {
      count,
    };
  }
}
