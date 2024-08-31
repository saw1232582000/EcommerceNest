import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseSchema } from '../../common/BaseResponseSchema';

class RemoveFromCartResponse {
  @ApiProperty()
  message: string;
}

export class RemoveFromCartResponseSchema extends BaseResponseSchema<any> {
  @ApiProperty({ type: RemoveFromCartResponse })
  data: RemoveFromCartResponse;
}
