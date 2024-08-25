import { Inject, Injectable } from '@nestjs/common';

import { CreateProductDto } from '../dto/CreateProductDto';
import { IProductRepository } from '../port/repository-port/IProductRepository';

import { IGetProductListUseCase } from '../port/service-port/IGetProductListUseCase';
import { ProductFilter } from '../dto/ProductFilter';

@Injectable()
export class GetProductListUseCase implements IGetProductListUseCase {
  constructor(
    @Inject() private readonly productRepository: IProductRepository,
  ) {}
  public async execute(): Promise<any> {
    const products = await this.productRepository.findAll();

    return products.map((product) => CreateProductDto.convertToClass(product));
  }
}

@Injectable()
export class GetProductListWithFilterUseCase implements IGetProductListUseCase {
  constructor(
    @Inject() private readonly productRepository: IProductRepository,
  ) {}
  public async execute(filter:ProductFilter): Promise<any> {
    const products = await this.productRepository.findAllWithSchema(filter);

    return products.map((product) => CreateProductDto.convertToClass(product));
  }
}
