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
  ) { }

  async findAll(req) {
    const url = `${req.protocol}://${req.get('Host')}`;
    //relations llave foreanea
    const objProduct = await this.productRepository.find({
      relations: {
        category: true
      }
    });

    objProduct.map(obj => {
      obj.url_image = url + obj.url_image;
    });
    return objProduct;
  }

  /* Req: obtiene el host de la url */
  async findOne(id: number, req) {
    const objProduct = await this.productRepository.findOneBy(
      { id_product: id }
    );

    const url = `${req.protocol}://${req.get('Host')}`;
    objProduct.url_image = url + objProduct.url_image;

    console.log('req', url)
    return objProduct;
  }

  async getProduct(product): Promise<Product> {
    const objProduct = await this.productRepository.findOneBy({
      product_name: product
    });
    return objProduct;
  }

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto, file, req) {
    let objProduct = await this.productRepository.findOneBy(
      { id_product: id }
    );

    console.log('updateProductDto', updateProductDto)
    console.log('objProduct', objProduct)

    const url = `${req.protocol}://${req.get('Host')}`;
    const image = url + objProduct.url_image;
    if(typeof file !== 'undefined'){
      const currentPath = file.path;
      const newPath = currentPath.replace('img\\', '/');
      updateProductDto.url_image = newPath;
    } else {
      updateProductDto.url_image = objProduct.url_image;
    }  

    updateProductDto.categoryIdCategory = updateProductDto.id_category;
    objProduct = Object.assign(objProduct, updateProductDto);
    this.productRepository.save(objProduct);
    return objProduct;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
