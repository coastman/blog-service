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
    if (!params.likeUserId) params.likeUserId = uuidv4();
    params.userId = params.likeUserId;
    delete params.likeUserId;
    const result = await this.likeModel.create(params);
    return result;
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
}
