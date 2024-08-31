import { Inject, Injectable } from '@nestjs/common';

import { ICartRepository } from '../port/repository-port/ICartRepository';

import { IRemoveFromCartCase } from '../port/service-port/IRemoveFromCartUseCase';
import { RemoveFromCartDto } from '../dto/RemoveFromCartDto';

@Injectable()
export class RemoveFromCartUseCase implements IRemoveFromCartCase {
  constructor(@Inject() private readonly cartRepository: ICartRepository) {}
  public async execute(data?: RemoveFromCartDto): Promise<any> {
    await this.cartRepository.removeFromCart(data);

    return data;
  }
}
