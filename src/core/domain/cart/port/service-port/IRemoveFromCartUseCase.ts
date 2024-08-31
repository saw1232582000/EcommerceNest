import { IBaseUseCase } from 'src/core/common/base-usecase/port';

import { RemoveFromCartDto } from '../../dto/RemoveFromCartDto';



export interface IRemoveFromCartCase extends IBaseUseCase<RemoveFromCartDto, any> {}
