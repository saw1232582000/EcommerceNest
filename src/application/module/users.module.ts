import { Module } from '@nestjs/common';
import { UsersController } from '../controller/users.controller';

import { CreateUserUseCase } from 'src/core/domain/user/service/CreateUserUsecase';

import { IUserRepository } from 'src/core/domain/user/port/repository-port/IUserRepositoryPort';
import { PrismaUserRepository } from 'src/core/domain/user/Repository/PrismaUserRepository';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { AuthModule } from './auth.module';
import { AuthService } from 'src/core/domain/auth/service/Authservice';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    JwtGuard,

    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsersModule {}
