import { ApiProperty } from '@nestjs/swagger';
import { INote } from './interface/note.interface';

export class Note implements INote {
  @ApiProperty({ example: 'Note 1', description: 'Note title' })
  name: string;

  @ApiProperty({
    example: ['20.11.2022', '10.12.2022'],
    description: 'Dates mentioned in the text',
  })
  date: string[];

  @ApiProperty({ example: 'task', description: 'Note category' })
  category: string;

  @ApiProperty({ example: 'Lorem ips the...', description: 'Note body' })
  text: string;

  @ApiProperty({ example: '20.11.2022', description: 'Date of creation' })
  dateOfCreation: string;

  @ApiProperty({ example: true, description: 'Whether notes are archived' })
  archived: boolean;

  @ApiProperty({ example: 203213213, description: 'Unique id' })
  id: number;
}
