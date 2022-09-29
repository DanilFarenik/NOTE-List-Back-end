import { ApiProperty } from '@nestjs/swagger';

export class ErrorScheme {
  @ApiProperty({ example: '400', description: 'Code error' })
  statusCode: number;

  @ApiProperty({
    example: ['Category does not exist'],
    description: 'Error list',
  })
  message: string[] | string;

  @ApiProperty({ example: 'Bad Request', description: 'Error description' })
  error: string;
}
