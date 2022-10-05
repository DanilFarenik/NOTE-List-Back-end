import { ApiProperty } from '@nestjs/swagger';

export class Scheme {
  @ApiProperty({ example: '2** | 4**', description: 'Status code' })
  statusCode: number;

  @ApiProperty({
    example: "OK",
    description: 'Message list',
  })
  message: string[] | string;
}


export class ErrorScheme extends Scheme {
  @ApiProperty({ example: 'Bad Request', description: 'Error description' })
  error: string;
}