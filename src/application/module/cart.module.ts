import { Module } from '@nestjs/common';
import { CartController } from '../controller/cart.controller';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { AddToCartUseCase } from 'src/core/domain/cart/service/AddToCartUseCase';
import { RemoveFromCartUseCase } from 'src/core/domain/cart/service/RemoveFromCartUseCase';
import { ICartRepository } from 'src/core/domain/cart/port/repository-port/ICartRepository';
import { PrismaCartRepository } from 'src/core/domain/cart/repository/PrismaCartRepository';

@Module({
  controllers: [CartController],
  providers: [
    JwtGuard,
    AddToCartUseCase,
    RemoveFromCartUseCase,
    {
        provide:ICartRepository,
        useClass:PrismaCartRepository
    }
],
})
export class CartModule {}
