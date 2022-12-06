import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { TAG } from 'src/constans/table.constant';

@Table({
  tableName: TAG,
})
export class Tag extends Model<Tag> {
  @Column({
    unique: true,
    type: DataType.STRING,
  })
  name: string;

  @Column(DataType.STRING)
  description: string;
}
