import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Comment } from './comment.model';
import { Article } from '../article/article.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: typeof Article,
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  async findPage() {
    //
  }

  async create(body) {
    if (!body.commentatorId) {
      const commentatorId = uuidv4();
      body.commentatorId = commentatorId;
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
}
