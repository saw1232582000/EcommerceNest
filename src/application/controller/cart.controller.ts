import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { AddToCartRequestSchema } from './documentation/cart/RequestSchema/AddToCartRequestSchema';
import { RemoveFromCartRequestSchema } from './documentation/cart/RequestSchema/ReoveFromCardRequestSchema';
import { AddToCartUseCase } from 'src/core/domain/cart/service/AddToCartUseCase';
import { RemoveFromCartUseCase } from 'src/core/domain/cart/service/RemoveFromCartUseCase';
import { PrismaCartRepository } from 'src/core/domain/cart/repository/PrismaCartRepository';
import { Prisma, PrismaClient } from '@prisma/client';
import { AddToCartDto } from 'src/core/domain/cart/dto/AddToCartDto';
import { CoreApiResonseSchema } from 'src/core/common/schema/ApiResponseSchema';
import { RemoveFromCartDto } from 'src/core/domain/cart/dto/RemoveFromCartDto';
import { AddToCartResponseSchema } from './documentation/cart/ResponseSchema/AddToCartResponseSchema';
import { RemoveFromCartResponseSchema } from './documentation/cart/ResponseSchema/RemoveFromCartResponseSchema';

@Controller('Cart')
@ApiTags('cart')
export class CartController {
  constructor(
    @Inject()
    private addToCartUseCase: AddToCartUseCase,
    private removeFromCartUseCase: RemoveFromCartUseCase,
  ) {}
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({ type: AddToCartRequestSchema })
  @ApiResponse({ type: AddToCartResponseSchema })
  @Post('/AddToCart')
  public async addToCart(@Body() product: AddToCartRequestSchema, @Req() req) {
    this.addToCartUseCase = new AddToCartUseCase(
      new PrismaCartRepository(new PrismaClient()),
    );
    const addToCartDto = new AddToCartDto();
    addToCartDto.productId = product.productId;
    addToCartDto.userId = req.user?.user?.id;
    this.addToCartUseCase.execute(addToCartDto);
    return CoreApiResonseSchema.success({message:"Item added to cart successfully"});
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({ type: RemoveFromCartRequestSchema })
  @ApiResponse({ type: RemoveFromCartResponseSchema })
  @Post('/RemoveFromCart')
  public async removeFromCart(
    @Body() product: RemoveFromCartRequestSchema,
    @Req() req,
  ) {
    this.removeFromCartUseCase = new RemoveFromCartUseCase(
      new PrismaCartRepository(new PrismaClient()),
    );
    const removeFromCartDto = new RemoveFromCartDto();
    removeFromCartDto.productId = product.productId;
    removeFromCartDto.userId = req.user?.user?.id;
    this.addToCartUseCase.execute(removeFromCartDto);
    return CoreApiResonseSchema.success({message:"Item removed from cart successfully"});
  }
}
