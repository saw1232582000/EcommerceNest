
import { IUserRepository } from '../port/repository-port/IUserRepositoryPort';
import { ICreateUserUseCase } from '../port/service-port/ICreateUserUseCase';
import { UserEntity } from '../entity/User';
import { CreateUserDto } from '../dto/CreateUserDto';
import { Inject, Injectable, Scope } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(@Inject()private readonly userRepository: IUserRepository) {}
  public async execute(data?: CreateUserDto): Promise<any> {
    const newUser = new UserEntity(
      '4',
      data?.name,
      data?.email,
      data?.role,
      data?.password,
    );
    await this.userRepository.create(newUser);
    return newUser;
  }
}
