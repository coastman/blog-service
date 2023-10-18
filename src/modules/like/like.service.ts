import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './like.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like)
    private readonly likeModel: typeof Like,
  ) {}

  async liking(params: any) {
    if (!params.userId) params.userId = uuidv4();
    let record = await this.likeModel.findOne({
      where: {
        refId: params.refId,
        type: params.type,
        userId: params.userId,
      },
    });
    if (record) {
      await this.likeModel.update(
        {
          status: 1,
        },
        {
          where: {
            refId: params.refId,
            type: params.type,
          },
        },
      );
    } else {
      record = await this.likeModel.create(params);
    }
    return record;
  }

  async cancel(params: any) {
    await this.likeModel.update(
      {
        status: 0,
      },
      {
        where: {
          refId: params.refId,
          type: params.type,
        },
      },
    );
  }

  async downing(params: any) {
    if (!params.userId) params.userId = uuidv4();
    let record = await this.likeModel.findOne({
      where: {
        refId: params.refId,
        type: params.type,
        userId: params.userId,
      },
    });
    if (record) {
      await this.likeModel.update(
        {
          downvote: 1,
        },
        {
          where: {
            refId: params.refId,
            type: params.type,
          },
        },
      );
    } else {
      record = await this.likeModel.create(params);
    }
    return record;
  }
}
