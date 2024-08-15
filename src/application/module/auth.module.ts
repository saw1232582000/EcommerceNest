import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from 'src/core/domain/auth/service/Authservice';
import { JwtModule } from '@nestjs/jwt';
import { IUserRepository } from 'src/core/domain/user/port/repository-port/IUserRepositoryPort';
import { PrismaUserRepository } from 'src/core/domain/user/Repository/PrismaUserRepository';
import { LocalStrategy } from '../auth/passport/local.strategy';
import { UsersModule } from './users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    LocalStrategy,
  ],
})
export class AuthModule {}
