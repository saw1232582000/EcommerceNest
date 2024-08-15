import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { SinginUserDto } from '../dto/SigninUserDto';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../user/port/repository-port/IUserRepositoryPort';
import { PrismaUserRepository } from '../../user/Repository/PrismaUserRepository';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private userRepository: IUserRepository,
    @Inject() private jwtService: JwtService,
  ) {}
  async validateUser(credentials: SinginUserDto): Promise<any> {
    this.userRepository = new PrismaUserRepository(new PrismaClient());
    const result = await this.userRepository.find({ email: credentials.email });

    if (result) {
      if (credentials.password === result.password) {
        return this.jwtService.sign({ id: result.id, email: result.email });
      } else return null;
    }
    return null;
  }
}
