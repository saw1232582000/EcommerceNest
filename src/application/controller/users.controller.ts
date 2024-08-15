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
import { CoreApiResonseSchema } from 'src/core/common/schema/ApiResponseSchema';

@Controller('users')
export class UsersController {
  constructor(
    // @Inject()
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  async findOne(@Request() req): Promise<CoreApiResonseSchema<any>> {
    return CoreApiResonseSchema.success(req.user);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(
    @Body(
      new ValidationPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    user: CreateUserDto,
  ): Promise<CoreApiResonseSchema<any>> {
    this.createUserUseCase = new CreateUserUseCase(
      new PrismaUserRepository(new PrismaClient()),
    );
    await this.createUserUseCase.execute(user);
    return CoreApiResonseSchema.success('user registered successfully');
  }
}
