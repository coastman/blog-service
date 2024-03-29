import { Column, Model, Table, DataType, Default } from 'sequelize-typescript';
import { COMMENT } from 'src/constans/table.constant';

@Table({
  tableName: COMMENT,
})
export class Comment extends Model<Comment> {
  @Column(DataType.INTEGER)
  articleId: number;

  @Column(DataType.INTEGER)
  parentId: number;

  @Column(DataType.TEXT)
  content: string;

  @Column(DataType.STRING)
  commentator: string;

  @Column({
    type: DataType.STRING,
  })
  commentatorId: string;

  @Default(0)
  @Column(DataType.INTEGER)
  likeCount: number;

  @Default(0)
  @Column(DataType.INTEGER)
  dislikeCount: number;

  @Default(0)
  @Column(DataType.INTEGER)
  status: number;

  @Column({
    type: DataType.STRING,
  })
  agent: string;

  @Column({
    type: DataType.STRING,
  })
  ip: string;

  @Default('{}')
  @Column({
    type: DataType.STRING,
    get(this) {
      return JSON.parse(this.getDataValue('ipLocation') || '{}');
    },
    set(this, data: any) {
      this.setDataValue('ipLocation', JSON.stringify(data));
    },
  })
  ipLocation: string;
}
