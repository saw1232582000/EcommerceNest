import { IBaseUseCase } from 'src/core/common/base-usecase/port';
import { CreateOrderDto } from '../../dto/CreateOrderDto';

export interface IGetOrderUseCase extends IBaseUseCase<string, any> {}
