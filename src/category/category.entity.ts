import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id_category: number;
  
    @Column("varchar", { length: 45 })
    category_name: string;

    @OneToMany(() => Product, (product) => product.categories)
    products: Product[]
}
