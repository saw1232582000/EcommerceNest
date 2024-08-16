import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseSchema {
  @ApiProperty({ type: 'string' })
  public message: string;

  @ApiProperty({ type: 'number' })
  public code: number;

  @ApiProperty({ type: 'object' })
  public data: unknown;
}
