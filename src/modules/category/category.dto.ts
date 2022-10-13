import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CategoryDTO {
  id?: number;

  @IsNotEmpty({ message: '请输入分类名称' })
  @IsString()
  @Length(1, 20)
  name: string;

  @IsString()
  @MaxLength(20)
  description: string;
}
