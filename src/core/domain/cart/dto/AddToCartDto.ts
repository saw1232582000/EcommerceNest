import { Expose, plainToInstance } from 'class-transformer';
import { CartItemEntity } from '../../cart-item/entity/CartItem';
import { CartEntity } from '../entity/Cart';

export class AddToCartDto {
  @Expose()
  userId: string;

  @Expose()
  productId:string

  public static convertToClass(cart: CartEntity) {
    return plainToInstance(AddToCartDto, cart, {
      excludeExtraneousValues: true,
    });
  }
}
