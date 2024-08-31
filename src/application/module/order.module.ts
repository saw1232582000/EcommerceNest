import { Module } from '@nestjs/common';
import { OrderController } from '../controller/order.controller';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { IOrderRepository } from 'src/core/domain/order/port/repository-port/IOrderRepository';
import { PrismaOrderRepository } from 'src/core/domain/order/repository/PrismaOrderRepository';
import { GetOrderUseCase } from 'src/core/domain/order/service/GetOrderUseCase';
import { CreateorderUseCase } from 'src/core/domain/order/service/CreateOrderUseCase';
import { GetOrderListWithFilterUseCase } from 'src/core/domain/order/service/GetOrderListUseCase';

@Module({
  controllers: [OrderController],
  providers: [
    JwtGuard,
    GetOrderUseCase,
    CreateorderUseCase,
    GetOrderListWithFilterUseCase,
    {
      provide: IOrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
})
export class OrderModule {}
