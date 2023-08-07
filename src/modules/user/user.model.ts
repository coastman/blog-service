import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { USER } from 'src/constans/table.constant';

@Table({
  tableName: USER,
})
export class User extends Model<User> {
  @Column(DataType.STRING)
  account: string;

  @Column(DataType.STRING)
  nickName: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  password: string;
}
