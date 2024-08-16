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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserSchema } from './documentation/user/CreateUserSchema';

@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
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
  @ApiBody({type:CreateUserSchema})
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
    const createUserDto=new CreateUserDto();
    createUserDto.email=user.email;
    createUserDto.name=user.name;
    createUserDto.password=user.password;
    createUserDto.role=user.role;
    
    return CoreApiResonseSchema.success(await this.createUserUseCase.execute(createUserDto));
  }
}
