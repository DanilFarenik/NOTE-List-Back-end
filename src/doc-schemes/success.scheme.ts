import { ApiProperty } from '@nestjs/swagger';

export class SuccessScheme {
  @ApiProperty({ example: 'ok', description: 'Successful execution' })
  status: string;
}
