import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Comment } from './comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private readonly commentModel: typeof Comment,
  ) {}

  async findPage() {
    //
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByArticle(id: number) {
    //
  }
}
