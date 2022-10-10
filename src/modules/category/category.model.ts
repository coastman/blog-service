import {
  Column,
  Model,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

@Table
export class Category extends Model<Category> {
  @PrimaryKey
  @Column
  id: number;

  @Column({
    unique: true,
    type: DataType.STRING,
  })
  name: string;

  @Column(DataType.STRING)
  description: string;

  @CreatedAt
  createTime: Date;

  @UpdatedAt
  updateTime: Date;
}
