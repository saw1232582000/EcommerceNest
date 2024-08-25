import { Inject, Injectable } from '@nestjs/common';
import { ICreateProductUseCase } from '../port/service-port/ICreateProductUseCase';
import { ProductEntity } from '../entity/Product';
import { CreateProductDto } from '../dto/CreateProductDto';
import { IProductRepository } from '../port/repository-port/IProductRepository';

@Injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @Inject() private readonly productRepository: IProductRepository,
  ) {}
  public async execute(data?: CreateProductDto): Promise<any> {
    const newProduct = new ProductEntity(
      data?.id,
      data?.userId,
      data?.name,
      data?.price,
      data?.category,
      data?.description,
    );
    const createdProduct = await this.productRepository.create(newProduct);

    
    return CreateProductDto.convertToClass(createdProduct);
  }
}
