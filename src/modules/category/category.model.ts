import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { CATEGORY } from 'src/constans/table.constant';

@Table({
  tableName: CATEGORY,
})
export class Category extends Model<Category> {
  @Column({
    unique: true,
    type: DataType.STRING,
  })
  name: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  backgroundUrl: string;

  @Column(DataType.STRING)
  code: string;

  @Column(DataType.STRING)
  icon: string;
}
