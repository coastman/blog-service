import { DataSource } from 'typeorm';

const initDatabse = async () => {
  const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
  });

  await dataSource.initialize();
  await dataSource.query(
    'CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; ',
  );
  console.log('====> init databses success <=====');
  dataSource.destroy();
};

initDatabse();
