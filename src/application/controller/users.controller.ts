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

import { PrismaUserRepository } from 'src/core/domain/user/repository/PrismaUserRepository';
import { PrismaClient } from '@prisma/client';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CoreApiResonseSchema } from 'src/core/common/schema/ApiResponseSchema';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserResonseSchema } from './documentation/user/ResponseSchema/CreateUserResponseSchema';
import { GetUserUseCase } from 'src/core/domain/user/service/GetUserUsecase';
import { GetUserResonseSchema } from './documentation/user/ResponseSchema/GetUserResponseSchema';
import { CreateUserSchema } from './documentation/user/RequsetSchema/CreateUserRequestSchema';

@Controller('User')
@ApiTags('users')
export class UsersController {
  constructor(
    // @Inject()
    private getUserUseCase: GetUserUseCase,
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({ type: GetUserResonseSchema })
  @Get()
  async findOne(@Request() req): Promise<CoreApiResonseSchema<any>> {
    this.getUserUseCase = new GetUserUseCase(
      new PrismaUserRepository(new PrismaClient()),
    );

    return CoreApiResonseSchema.success(
      await this.getUserUseCase.execute(req.user?.user?.id),
    );
  }

  @Post()
  @ApiBody({ type: CreateUserSchema })
  @ApiResponse({ type: CreateUserResonseSchema })
  @HttpCode(HttpStatus.OK)
  public async create(
    @Body(
      new ValidationPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    user: CreateUserSchema,
  ): Promise<CoreApiResonseSchema<any>> {
    this.createUserUseCase = new CreateUserUseCase(
      new PrismaUserRepository(new PrismaClient()),
    );
    const createUserDto = new CreateUserDto();
    createUserDto.email = user.email;
    createUserDto.name = user.name;
    createUserDto.password = user.password;
    createUserDto.role = user.role;

    return CoreApiResonseSchema.success(
      await this.createUserUseCase.execute(createUserDto),
    );
  }
}
