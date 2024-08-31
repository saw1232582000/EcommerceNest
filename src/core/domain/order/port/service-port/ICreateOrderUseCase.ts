import { IBaseUseCase } from 'src/core/common/base-usecase/port';
import { CreateOrderDto } from '../../dto/CreateOrderDto';

export interface ICreateOrderUseCase
  extends IBaseUseCase<CreateOrderDto, any> {}
