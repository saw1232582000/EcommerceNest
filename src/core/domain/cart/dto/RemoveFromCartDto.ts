import { Expose, plainToInstance } from 'class-transformer';
import { CartItemEntity } from '../../cart-item/entity/CartItem';
import { CartEntity } from '../entity/Cart';

export class RemoveFromCartDto {
  @Expose()
  userId: string;

  @Expose()
  productId:string
}
