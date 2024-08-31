import { IBaseUseCase } from 'src/core/common/base-usecase/port';

import { AddToCartDto } from '../../dto/AddToCartDto';



export interface IAddToCartUseCase extends IBaseUseCase<AddToCartDto, any> {}
