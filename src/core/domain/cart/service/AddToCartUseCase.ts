import { Inject, Injectable } from '@nestjs/common';
import { IAddToCartUseCase } from '../port/service-port/IAddToCartUseCase';
import { ICartRepository } from '../port/repository-port/ICartRepository';
import { AddToCartDto } from '../dto/AddToCartDto';

@Injectable()
export class AddToCartUseCase implements IAddToCartUseCase {
  constructor(@Inject() private readonly cartRepository: ICartRepository) {}
  public async execute(data?: AddToCartDto): Promise<any> {
    await this.cartRepository.addToCart(data);

    return data;
  }
}
