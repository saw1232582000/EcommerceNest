import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseSchema } from '../../common/BaseResponseSchema';

class CreateOrderResponse {
  @ApiProperty()
  message: string;
}
export class CreateOrderResponseSchema extends BaseResponseSchema<CreateOrderResponse> {
  @ApiProperty({ type: CreateOrderResponse })
  public data: CreateOrderResponse;
}
