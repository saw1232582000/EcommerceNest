import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseSchema } from '../../common/BaseResponseSchema';



class ProductResponse {
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

class OrderItemResponse {
  @ApiProperty()
  Id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  createdDate: string;

  @ApiProperty({type: ProductResponse})
  product: ProductResponse;
}

export class OrderResponse {
    @ApiProperty()
    userId: string;
  
    @ApiProperty()
    address: string;
  
    @ApiProperty()
    status: string;
  
    @ApiProperty()
    billingPhoneNumber: string;
  
    @ApiProperty({type:[OrderItemResponse]})
    orderItems: OrderItemResponse[];
  
    @ApiProperty()
    createdDate: Date;
  
    @ApiProperty()
    updateddDate: Date;
  }

export class GetOrderResponseSchema extends BaseResponseSchema<OrderResponse> {
  @ApiProperty({ type: OrderResponse })
  public data: OrderResponse;
}
