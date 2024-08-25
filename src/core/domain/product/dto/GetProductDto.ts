import { Expose, plainToInstance } from 'class-transformer';



import { ProductEntity } from '../entity/Product';
import { Nullable } from 'src/core/common/type/CommonTypes';

export class GetProductDto {
    @Expose()
    id: Nullable<string>;

    @Expose()
    name: string;
  
    @Expose()
    price: number;
  
    @Expose()
    description: string;
  
    @Expose()
    category: string;
  
    @Expose()
    createdDate: Nullable<Date>;
  
    @Expose()
    updatedDate: Nullable<Date>;

  public static convertToClass(product: ProductEntity) {
    return plainToInstance(GetProductDto, product, {
      excludeExtraneousValues: true,
    });
  }
}
