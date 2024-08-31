import { Inject, Injectable } from "@nestjs/common";
import { IGetOrderListUseCase } from "../port/service-port/IGetOrderListUseCase";
import { IOrderRepository } from "../port/repository-port/IOrderRepository";
import { OrderFilter } from "../dto/OrderFilter";
import { CreateOrderDto } from "../dto/CreateOrderDto";


@Injectable()
export class GetOrderListWithFilterUseCase implements IGetOrderListUseCase {
  constructor(
    @Inject() private readonly orderRepository: IOrderRepository,
  ) {}
  public async execute(filter:OrderFilter): Promise<any> {
    const orders = await this.orderRepository.findAllWithSchema(filter);

    return orders.map((order) => CreateOrderDto.convertToClass(order));
  }
}