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
import { IProductRepository } from '../port/repository-port/IProductRepository';
import { ProductEntity } from '../entity/Product';
import { ProductFilter } from '../dto/ProductFilter';

export class PrismaProductRepository implements IProductRepository {
  constructor(public readonly prisma: PrismaClient) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      const result = await this.prisma.product.create({
        data: {
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          userId: product.userId,
        },
        // data:{
        //     ...product
        // }
      });
      return ProductEntity.toEntity(result);
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
            description: 'Cannot create product',
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
  async update(product: ProductEntity): Promise<ProductEntity> {
    try {
      const result = await this.prisma.product.update({
        where: { id: product.id },
        data: {
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          userId: product.userId,
          updatedDate: new Date(),
        },
      });
      return ProductEntity.toEntity(result);
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
      await this.prisma.product.delete({
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
  }): Promise<ProductEntity | null> {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          ...by,
        },
      });

      if (product) return ProductEntity.toEntity(product);
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
  async findAll(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany({});

    return products.map((product) => ProductEntity.toEntity(product));
  }

  async findAllWithSchema(filter: ProductFilter): Promise<ProductEntity[]> {
    console.log(filter)
    const products = await this.prisma.product.findMany({
      where: {
        name: { contains: filter.name },
      },
      take: filter.take,
      skip: filter.skip,
    });

    return products.map((product) => ProductEntity.toEntity(product));
  }
}
