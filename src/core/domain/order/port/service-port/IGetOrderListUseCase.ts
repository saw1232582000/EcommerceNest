import { IBaseUseCase } from 'src/core/common/base-usecase/port';
import { OrderFilter } from '../../dto/OrderFilter';

export interface IGetOrderListUseCase extends IBaseUseCase<OrderFilter, any> {}
