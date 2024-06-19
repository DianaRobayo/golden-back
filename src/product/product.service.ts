import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async getProduct(product): Promise<Product> {
    const objProduct = await this.productRepository.findOneBy({
      product_name: product
    });
    return objProduct;
  }

  async findAll() {
    const objProduct = await this.productRepository.findBy({});
    return objProduct;
  }

  async findOne(id: number) {
    const objProduct = await this.productRepository.findOneBy(
      {id_product: id}
    );
    return objProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const objProduct = await this.productRepository.findOneBy(
      {id_product: id}
    );
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
