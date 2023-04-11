import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => {
        return {
          storage: multer.diskStorage({
            destination: 'src/static',
            filename: (_req, file, cb) => cb(null, file.originalname),
          }),
        };
      },
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
