import { IBaseUseCase } from 'src/core/common/base-usecase/port';
import { CreateProductDto } from '../../dto/CreateProductDto';



export interface IUpdateProductUseCase extends IBaseUseCase<CreateProductDto, any> {}
