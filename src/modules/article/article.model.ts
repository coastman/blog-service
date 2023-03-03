import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ARTICLE } from 'src/constans/table.constant';

@Table({
  tableName: ARTICLE,
})
export class Article extends Model<Article> {
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column({
    type: DataType.STRING,
    get(this) {
      return this.getDataValue('tagIdList')
        .split(',')
        .filter((item) => item)
        .map((item) => parseInt(item));
    },
    set(this, array: any[]) {
      this.setDataValue('tagIdList', array.join(','));
    },
  })
  tagIdList: string;

  @Column({
    type: DataType.STRING,
    get(this) {
      return this.getDataValue('categoryIdList')
        .split(',')
        .filter((item) => item)
        .map((item) => parseInt(item));
    },
    set(this, array: any[]) {
      this.setDataValue('categoryIdList', array.join(','));
    },
  })
  categoryIdList: string;

  @Column(DataType.TEXT('medium'))
  content: string;
}
