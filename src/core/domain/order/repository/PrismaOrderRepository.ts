import { PrismaClient } from '@prisma/client';

import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import { CoreApiResonseSchema } from 'src/core/common/schema/ApiResponseSchema';

import { IOrderRepository } from '../port/repository-port/IOrderRepository';
import { OrderEntity } from '../entity/Order';
import { OrderFilter } from '../dto/OrderFilter';

export class PrismaOrderRepository implements IOrderRepository {
  constructor(public readonly prisma: PrismaClient) {}

  async create(order: OrderEntity): Promise<OrderEntity> {
    try {
      const result = await this.prisma.order.create({
        data: {
          address: order.address,
          billingPhoneNumber: order.billingPhoneNumber,
          userId: order.userId,
          orderItems: {
            createMany: {
              data: order.orderItems.map((orderItem) => {
                return {
                  productId: orderItem.productId,
                  quantity: orderItem.quantity,
                  status: 'processing',
                };
              }),
            },
          },
        },
      });
      return OrderEntity.toEntity(result);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new BadRequestException(
            CoreApiResonseSchema.error(
              HttpStatus.BAD_REQUEST,
              'Bad Request',
              'Email already used',
            ),
          );
        } else {
          throw new BadRequestException('Bad Request', {
            cause: new Error(),
            description: 'Cannot create order',
          });
        }
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
  async update(order: OrderEntity): Promise<OrderEntity> {
    try {
      const result = await this.prisma.order.update({
        where: { Id: order.Id },
        data: {
          address: '',
          billingPhoneNumber: '',
          userId: '',
        },
      });
      return OrderEntity.toEntity(result);
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
      await this.prisma.order.delete({
        where: { Id: id },
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
  }): Promise<OrderEntity | null> {
    try {
      const order = await this.prisma.order.findFirst({
        where: {
          Id: by.id,
        },
        include: {
          orderItems: {
            include: {
              product: {
                include: {},
              },
            },
          },
        },
      });

      if (order) return OrderEntity.toEntity(order);
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
  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({});

    return orders.map((order) => OrderEntity.toEntity(order));
  }

  async findAllWithSchema(filter: OrderFilter): Promise<OrderEntity[]> {
    console.log(filter);
    const products = await this.prisma.order.findMany({
      where: {},
      take: filter.take,
      skip: filter.skip,
      include: {
        orderItems: {
          include: {
            product: {
              include: {},
            },
          },
        },
      },
    });
    console.log(products)

    return products.map((product) => OrderEntity.toEntity(product));
  }
}
