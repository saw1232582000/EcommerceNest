import { IBaseRepository } from 'src/core/common/base-repository/port';
import { CartEntity } from '../../entity/Cart';
import { AddToCartDto } from '../../dto/AddToCartDto';
import { RemoveFromCartDto } from '../../dto/RemoveFromCartDto';

export abstract class ICartRepository
  implements IBaseRepository<CartEntity, any>
{
  create: (entity: CartEntity) => Promise<CartEntity>;
  delete: (id: string) => Promise<boolean>;
  find: (by: { id?: string; name?: string }) => Promise<CartEntity | null>;
  findAll: () => Promise<CartEntity[]>;
  update: (entity: CartEntity) => Promise<CartEntity>;
  addToCart: (data: AddToCartDto) => Promise<CartEntity>;
  removeFromCart: (data: RemoveFromCartDto) => Promise<CartEntity>;
}
