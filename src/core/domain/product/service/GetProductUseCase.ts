import { Inject, Injectable } from '@nestjs/common';
import { ICreateProductUseCase } from '../port/service-port/ICreateProductUseCase';
import { ProductEntity } from '../entity/Product';
import { CreateProductDto } from '../dto/CreateProductDto';
import { IProductRepository } from '../port/repository-port/IProductRepository';
import { IGetProductUseCase } from '../port/service-port/IGetProductUseCase';

@Injectable()
export class GetProductUseCase implements IGetProductUseCase {
  constructor(
    @Inject() private readonly productRepository: IProductRepository,
  ) {}
  public async execute(id: string): Promise<any> {
    const product = await this.productRepository.find({ id: id });

    return CreateProductDto.convertToClass(product);
  }
}
