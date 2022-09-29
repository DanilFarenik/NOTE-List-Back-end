import { ApiProperty } from '@nestjs/swagger';
import { IStats } from './interface/stats.interface';

export class Stats implements IStats {
  @ApiProperty({ example: 203213213, description: 'Unique id' })
  id: number;

  @ApiProperty({ example: 2, description: 'Number of active notes' })
  active: number;

  @ApiProperty({ example: 3, description: 'Number of archived notes' })
  archive: number;

  @ApiProperty({ example: 'Task', description: 'Name category' })
  name: string;
}
