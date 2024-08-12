import { IBaseUseCase } from 'src/core/common/base-usecase/port';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

export interface ICreateUserUseCase extends IBaseUseCase<CreateUserDto, any> {}
