import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id_category: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id_category });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async getCategory(category): Promise<Category> {
    const objCategory = await this.categoryRepository.findOneBy({
      category_name: category
    });
    return objCategory;
  }
}