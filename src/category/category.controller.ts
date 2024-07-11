import { Body, Controller, Post, Delete, Param, Get, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id);
  }
  
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    console.log('category controlador', createCategoryDto)
    return this.categoryService.create(createCategoryDto);
  }

  @Post('find-category')
  async getCategory(@Body() body): Promise<Category> {
    return await this.categoryService.getCategory(body.category_name);
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateCategoryDto) {
    return this.categoryService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }
}
