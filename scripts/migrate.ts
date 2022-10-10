import {
  Sequelize,
  Column,
  Model,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

@Table
class TractionRecord extends Model<TractionRecord> {
  @PrimaryKey
  @Column
  id: number;

  @Column({
    unique: true,
    type: DataType.STRING,
  })
  name: string;

  @CreatedAt
  createTime: Date;

  @UpdatedAt
  updateTime: Date;
}

const runMigrate = async () => {
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'blog',
  });

  sequelize.addModels([TractionRecord]);
  await sequelize.sync();
  const res = await TractionRecord.findAll();
  console.log(res);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const obj = require('../src/migrations/.tpl');
  console.log(obj);
};

runMigrate();
