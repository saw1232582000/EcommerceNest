import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveFromCartRequestSchema {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;
}
