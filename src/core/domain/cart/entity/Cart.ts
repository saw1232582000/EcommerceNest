import { CartItemEntity } from '../../cart-item/entity/CartItem';

export class CartEntity {
  id: string;
  userId: string;
  cartItems: CartItemEntity[];

  constructor(id: string = '', userId: string, cartItems?: CartItemEntity[]) {
    this.id = id;
    this.userId = userId;
    this.cartItems = cartItems;
  }

  public static toEntity(cart: any): CartEntity {
    const cartItems = cart?.cartItems.map((cartItem) => {
      return CartItemEntity.toEntity(cartItem);
    });
    return new CartEntity(cart?.id, cart?.userId, cartItems ? cartItems : []);
  }
}
