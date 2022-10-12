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
    allowNull: false,
  })
  name: string;

  @CreatedAt
  createTime: Date;

  @UpdatedAt
  updateTime: Date;
}

const run = async () => {
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'blog',
  });
  sequelize.addModels([TractionRecord]);
  await TractionRecord.sync();
  await TractionRecord.findAll({
    order: [['name', 'DESC']],
  });
};

run();
