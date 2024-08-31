import { Inject, Injectable } from '@nestjs/common';
import { ICreateOrderUseCase } from '../port/service-port/ICreateOrderUseCase';
import { IOrderRepository } from '../port/repository-port/IOrderRepository';
import { CreateOrderDto } from '../dto/CreateOrderDto';
import { OrderEntity } from '../entity/Order';
import { OrderItemEntity } from '../entity/OrderItem';

@Injectable()
export class CreateorderUseCase implements ICreateOrderUseCase {
  constructor(@Inject() private readonly orderRepository: IOrderRepository) {}
  public async execute(data?: CreateOrderDto): Promise<any> {
    const newOrder = new OrderEntity(
      undefined,
      data?.userId,
      data?.address,
      data?.billingPhoneNumber,
      data?.status,
      data?.orderItems?.map((orderItem) => {
        return OrderItemEntity.toEntity(orderItem);
      }),
    );
    const createdOrder = await this.orderRepository.create(newOrder);

    return CreateOrderDto.convertToClass(createdOrder);
  }
}
