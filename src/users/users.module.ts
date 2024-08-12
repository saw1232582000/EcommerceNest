import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserUseCase } from 'src/core/domain/user/service/CreateUserUsecase';
import { LocalUserRepository } from 'src/core/domain/user/Repository/LocalUserRepository';
import { IUserRepository } from 'src/core/domain/user/port/repository-port/IUserRepositoryPort';
import { PrismaUserRepository } from 'src/core/domain/user/Repository/PrismaUserRepository';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UsersService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsersModule {}
