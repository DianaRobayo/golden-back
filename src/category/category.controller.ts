import { Body, Controller, Post, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    console.log('category controlador', createCategoryDto)
    return this.categoryService.create(createCategoryDto);
  }

  @Post('find-category')
  async getCategory(@Body() body): Promise<Category> {
    // console.log('email controlador', body.email)
    return await this.categoryService.getCategory(body.category_name);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }
}
