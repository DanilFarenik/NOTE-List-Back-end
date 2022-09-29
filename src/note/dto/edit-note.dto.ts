import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { category } from 'src/util';

export class EditNoteDto {
  @ApiProperty({ example: 'Note 1', description: 'Note title' })
  @IsString({ message: 'Name must be a string' })
  @Length(1, 100, { message: 'Max length name 100' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'Lorem ips the...', description: 'Note body' })
  @IsString({ message: 'Text must be a string' })
  @Length(1, 200, { message: 'Max length text 200' })
  @IsOptional()
  readonly text?: string;

  @ApiProperty({ example: 'task', description: 'Note category' })
  @IsOptional()
  @IsEnum(category, { message: 'Category does not exist' })
  readonly category?: string;

  @ApiProperty({ example: 'true', description: 'Whether notes are archived' })
  @IsBoolean({ message: 'Archived must be a boolean' })
  @IsOptional()
  readonly archived?: boolean;
}
