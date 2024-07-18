import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService
  ) { }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.productService.findAll(req);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    return await this.productService.findOne(+id, req);
  }

  @Post('find-product')
  async getProduct(@Body() body): Promise<Product> {
    return await this.productService.getProduct(body.product_name);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: function (req, file, cb) {
        cb(null, './img')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
      }
    })
  }))
  create(@Body() createProductDto: CreateProductDto, 
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request): Promise<Product> { 

    return this.productService.create(createProductDto, file, req);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: function (req, file, cb) {
        cb(null, './img')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
      }
    })
  }))
  update(@Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto, 
    @UploadedFile() file: Express.Multer.File, 
    @Req() req: Request) {
    return this.productService.update(+id, updateProductDto, file, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {dest: './img'}))
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: function (req, file, cb) {
        cb(null, './img')
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
    // return this.productService.create(createProductDto);
  }
}
