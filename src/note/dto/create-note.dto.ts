import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { category } from 'src/util';

export class CreateNoteDto {
  @ApiProperty({ example: 'Note 1', description: 'Note title' })
  @IsString({ message: 'Name must be a string' })
  @Length(1, 100, { message: 'Max length name 100' })
  readonly name: string;

  @ApiProperty({ example: 'Lorem ips the...', description: 'Note body' })
  @IsString({ message: 'Text must be a string' })
  @Length(1, 200, { message: 'Max length text 200' })
  readonly text: string;

  @ApiProperty({ example: 'task', description: 'Note category' })
  @IsEnum(category, { message: 'Category does not exist' })
  readonly category: string;
}
