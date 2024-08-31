import { PrismaClient } from '@prisma/client';

import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import { CoreApiResonseSchema } from 'src/core/common/schema/ApiResponseSchema';
import { ICartRepository } from '../port/repository-port/ICartRepository';
import { CartEntity } from '../entity/Cart';
import { filter } from 'rxjs';
import { AddToCartDto } from '../dto/AddToCartDto';
import { RemoveFromCartDto } from '../dto/RemoveFromCartDto';

export class PrismaCartRepository implements ICartRepository {
  constructor(public readonly prisma: PrismaClient) {}

  async create(cart: CartEntity): Promise<CartEntity> {
    try {
      const result = await this.prisma.cart.create({
        data: {
          userId: cart.userId,
        },
      });
      return CartEntity.toEntity(result);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Bad Request', {
          cause: new Error(),
          description: 'Cannot create cart',
        });
      }
      if (e instanceof PrismaClientValidationError) {
        console.log(e);
        throw new InternalServerErrorException('Something bad happened', {
          cause: new Error(),
          description: e.message,
        });
      }
    }
  }
  async update(cart: CartEntity): Promise<CartEntity> {
    try {
      const result = await this.prisma.cart.update({
        where: { id: cart.id },
        data: {
          //   name: cart.name,
          //   category: cart.category,
          //   description: cart.description,
          //   price: cart.price,
          //   userId: cart.userId,
          //   updatedDate: new Date(),
        },
      });
      return CartEntity.toEntity(result);
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        throw new InternalServerErrorException('Something bad happened', {
          cause: new Error(),
          description: e.message,
        });
      }
      if (e instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Something bad happened', {
          cause: new Error(),
          description: e.code,
        });
      }
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.cart.delete({
        where: { id: id },
      });
      return true;
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        throw new InternalServerErrorException('Something bad happened', {
          cause: new Error(),
          description: e.message,
        });
      }
      if (e instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Something bad happened', {
          cause: new Error(),
          description: e.code,
        });
      }
    }
  }
  async find(by: {
    id?: string;
    email?: string;
    name?: string;
  }): Promise<CartEntity | null> {
    try {
      const cart = await this.prisma.cart.findFirst({
        where: {
          ...by,
        },
        include: {
          cartItems: {
            include: {
              product: {
                include: {},
              },
            },
          },
        },
      });

      if (cart) return CartEntity.toEntity(cart);
      else return null;
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        throw new InternalServerErrorException('Something bad happened', {
          cause: new Error(),
          description: e.message,
        });
      }
      if (e instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Something bad happened', {
          cause: new Error(),
          description: e.code,
        });
      }
    }
  }
  async findAll(): Promise<CartEntity[]> {
    const carts = await this.prisma.cart.findMany({});

    return carts.map((cart) => CartEntity.toEntity(cart));
  }

  async addToCart(data: AddToCartDto): Promise<CartEntity> {
    try {
      const cartItem = await this.prisma.cartItem.findFirst({
        where: {
          cart: { userId: data.userId },
          productId: data.productId,
        },
      });

      if (cartItem) {
        const cart = await this.prisma.cart.update({
          where: {
            id: cartItem.cartId,
          },
          data: {
            cartItems: {
              update: {
                where: {
                  id: cartItem.id,
                },
                data: {
                  quantity: cartItem.quantity + 1,
                },
              },
            },
          },
        });
        return CartEntity.toEntity(cart);
      } else {
        const cart = await this.prisma.cart.update({
          where: {
            id: cartItem.cartId,
          },
          data: {
            cartItems: {
              create: {
                productId: data.productId,
                quantity: 1,
              },
            },
          },
        });
        return CartEntity.toEntity(cart);
      }
    } catch (e) {
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: 'Cannot add cart item',
      });
    }
  }
  async removeFromCart(data: RemoveFromCartDto): Promise<CartEntity> {
    try {
      const cartItem = await this.prisma.cartItem.findFirst({
        where: {
          cart: { userId: data.userId },
          productId: data.productId,
        },
      });
      if (!cartItem) {
        throw new NotFoundException('Item Not Found', {
          cause: new Error(),
          description: 'Cannot remove item from cart',
        });
      }
      if (cartItem.quantity > 1) {
        const cart = await this.prisma.cart.update({
          where: {
            id: cartItem.cartId,
          },
          data: {
            cartItems: {
              update: {
                where: {
                  id: cartItem.id,
                },
                data: {
                  quantity: cartItem.quantity - 1,
                },
              },
            },
          },
        });
        return CartEntity.toEntity(cart);
      } else if (cartItem.quantity == 1) {
        const cart = await this.prisma.cart.update({
          where: {
            id: cartItem.cartId,
          },
          data: {
            cartItems: {
              delete: {
                id: cartItem.id,
              },
            },
          },
        });
        return CartEntity.toEntity(cart);
      }
    } catch (e) {
      throw new InternalServerErrorException('Internal Server Error', {
        cause: new Error(),
        description: 'Cannot add cart item',
      });
    }
  }
}
