import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserZodValidationPipe } from 'src/users/pipes/user/user-pipes';
import {
  createUserDto,
  createUserSchema,
} from 'src/users/pipes/user/user-type';

import { CreateUserUseCase } from 'src/core/domain/user/service/CreateUserUsecase';
import { CreateUserDto } from 'src/core/domain/user/dto/CreateUserDto';
import { LocalUserRepository } from 'src/core/domain/user/Repository/LocalUserRepository';
import { PrismaUserRepository } from 'src/core/domain/user/Repository/PrismaUserRepository';
import { PrismaClient } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    // @Inject()
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @Get()
  findOne(@Query() query: { id: string; name: string }) {
    return `This is the requested user id:${query.id} and name is ${query.name}`;
  }

  @Get('/get-one-user/:id')
  findOneByEmail(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return id;
  }

  // @Post()
  // @UsePipes(new UserZodValidationPipe(createUserSchema))
  // create(@Body() user: createUserDto) {
  //   return JSON.stringify(user);
  // }

  @Post()
  public async create(
    @Body(
      new ValidationPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    user: CreateUserDto,
  ) {
    this.createUserUseCase=new CreateUserUseCase(new PrismaUserRepository(new PrismaClient()))
    return await this.createUserUseCase.execute(user);
  }
}
