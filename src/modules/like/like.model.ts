import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { LIKE } from 'src/constans/table.constant';

@Table({
  tableName: LIKE,
})
export class Like extends Model<Like> {
  @Column(DataType.INTEGER)
  refId: number;

  @Column(DataType.INTEGER)
  type: number;

  @Column(DataType.STRING)
  userId: string;

  @Column(DataType.INTEGER)
  status: number;

  @Column(DataType.INTEGER)
  downvote: number;
}
