import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseSchema } from '../../common/BaseResponseSchema';

class AddToCartResponse {
  @ApiProperty()
  message: string;
}

export class AddToCartResponseSchema extends BaseResponseSchema<any> {
  @ApiProperty({ type: AddToCartResponse })
  data: AddToCartResponse;
}
