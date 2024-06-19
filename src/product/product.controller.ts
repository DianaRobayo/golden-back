import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, Res, Render } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    console.log('product controlador', createProductDto)
    return this.productService.create(createProductDto);
  }

  @Post('find-product')
  async getProduct(@Body() body): Promise<Product> {
    // console.log('nombre product controlador', body.product_name)
    return await this.productService.getProduct(body.product_name);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
