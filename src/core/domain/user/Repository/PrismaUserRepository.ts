import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../entity/User';
import { IUserRepository } from '../port/repository-port/IUserRepositoryPort';
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
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';
import { CoreApiResonseSchema } from 'src/core/common/schema/ApiResponseSchema';

export class PrismaUserRepository implements IUserRepository {
  constructor(public readonly prisma: PrismaClient) {}

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      const result = await this.prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: user.password,
          role: user.role,
        },
      });
      return UserEntity.toEntity(result);
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
            description: 'Cannot create user',
          });
        }
      }
      if (e instanceof PrismaClientValidationError) {
        throw new InternalServerErrorException('Something bad happened', {
          cause: new Error(),
          description: e.message,
        });
      }
    }
  }
  async update(user: UserEntity): Promise<UserEntity> {
    try {
      const result = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          email: user?.email,
          name: user?.name,
          password: user?.password,
          role: user?.role,
          updatedDate: new Date(),
        },
      });
      return UserEntity.toEntity(result);
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
      await this.prisma.user.delete({
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
  }): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          ...by,
        },
      });

      if (user) return UserEntity.toEntity(user);
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
  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({});

    return users.map((user) => UserEntity.toEntity(user));
  }
}
