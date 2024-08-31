import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseSchema } from "../../common/BaseResponseSchema";
import { OrderResponse } from "./GetOrderResponseSchema";

export class GetOrderListResponseSchema extends BaseResponseSchema<OrderResponse[]> {
    @ApiProperty({ type: [OrderResponse] })
    public data: OrderResponse[];
  }