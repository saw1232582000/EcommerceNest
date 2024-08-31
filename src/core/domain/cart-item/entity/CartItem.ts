import { UserRole } from 'src/core/common/type/UserEnum';

export class CartItemEntity {
  id: string;

  cartId: string;

  productId: string;

  quantity: number;

  createdDate: Date;

  updatedDate: Date;

  constructor(
    id: string = '',
    cartId: string,
    productId: string,
    quantity: number,
    createdDate?: Date,
    updatedDate?: Date,
  ) {
    this.id = id;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;

    this.createdDate = createdDate || new Date();
    this.updatedDate = updatedDate || new Date();
  }

  public static toEntity(user: any): CartItemEntity {
    return new CartItemEntity(
      user?.id,
      user?.cartId,
      user?.productId,
      user?.description,
      user?.createdDate,
      user?.updatedDate,
    );
  }
}
