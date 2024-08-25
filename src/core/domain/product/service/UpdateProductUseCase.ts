import { Inject, Injectable } from '@nestjs/common';
import { ICreateProductUseCase } from '../port/service-port/ICreateProductUseCase';
import { ProductEntity } from '../entity/Product';
import { IUpdateProductUseCase } from '../port/service-port/IUpdateProductUseCase';
import { IProductRepository } from '../port/repository-port/IProductRepository';
import { UpdateProductDto } from '../dto/UpdateProductDto';

@Injectable()
export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    @Inject() private readonly productRepository: IProductRepository,
  ) {}
  public async execute(data?: UpdateProductDto): Promise<any> {
    const newProduct = new ProductEntity(
      data?.id,
      data?.userId,
      data?.name,
      data?.price,
      data?.category,
      data?.description,
    );
    const updatedProduct = await this.productRepository.update(newProduct);

    return UpdateProductDto.convertToClass(updatedProduct);
  }
}
