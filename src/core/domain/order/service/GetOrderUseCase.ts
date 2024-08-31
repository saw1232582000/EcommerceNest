import { Inject, Injectable } from '@nestjs/common';
import { ICreateOrderUseCase } from '../port/service-port/ICreateOrderUseCase';
import { IOrderRepository } from '../port/repository-port/IOrderRepository';
import { CreateOrderDto } from '../dto/CreateOrderDto';
import { OrderEntity } from '../entity/Order';
import { OrderItemEntity } from '../entity/OrderItem';
import { IGetOrderUseCase } from '../port/service-port/IGetOrderUseCase';

@Injectable()
export class GetOrderUseCase implements IGetOrderUseCase {
  constructor(@Inject() private readonly orderRepository: IOrderRepository) {}
  public async execute(id: string): Promise<any> {
    const order = await this.orderRepository.find({ id: id });
    // const createdOrder = await this.orderRepository.create(order);

    return CreateOrderDto.convertToClass(order);
  }
}
