import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    public categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const objCategories = await this.categoryRepository.findBy({});
    return objCategories;
  }

  findOne(id_category: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id_category });
  }
  
  async getCategory(category): Promise<Category> {
    const objCategory = await this.categoryRepository.findOneBy({
      category_name: category
    });
    return objCategory;
  }
  
  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async update(id: number, updateCategoryDto: CreateCategoryDto) {
    let objCategory = await this.categoryRepository.findOneBy(
      { id_category: id }
    );
    objCategory.category_name = updateCategoryDto.category_name;
    this.categoryRepository.save(objCategory);
    return objCategory;
  }
}