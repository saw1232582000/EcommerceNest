import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserUseCase } from 'src/core/domain/user/service/CreateUserUsecase';
import { CreateUserDto } from 'src/core/domain/user/dto/CreateUserDto';

import { PrismaUserRepository } from 'src/core/domain/user/Repository/PrismaUserRepository';
import { PrismaClient } from '@prisma/client';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    // @Inject()
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  findOne(@Request() req) {
    return req.user
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
  @HttpCode(HttpStatus.OK)
  public async create(
    @Body(
      new ValidationPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    user: CreateUserDto,
  ) {
    this.createUserUseCase = new CreateUserUseCase(
      new PrismaUserRepository(new PrismaClient()),
    );
    return await this.createUserUseCase.execute(user);
  }
}
