import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseSchema } from '../../common/BaseResponseSchema';

class GetProductResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updateddDate: Date;
}

export class GetProductResponseSchema extends BaseResponseSchema<GetProductResponse> {
  @ApiProperty({ type: GetProductResponse })
  public data: GetProductResponse;
}
