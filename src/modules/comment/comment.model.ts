import { Column, Model, Table, DataType } from 'sequelize-typescript';
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
    type: DataType.INTEGER,
    unique: true,
    autoIncrementIdentity: true,
  })
  commentatorId: number;

  @Column(DataType.INTEGER)
  likeCount: number;

  @Column(DataType.INTEGER)
  dislikeCount: number;
}
