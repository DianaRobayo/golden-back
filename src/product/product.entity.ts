import { Category } from 'src/category/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id_product: number;
  
    @Column("varchar", { length: 45 })
    product_name: string;
  
    @Column("varchar", { length: 200 })
    description: string;
  
    @Column("varchar", { length: 200 })
    url_image: string;
  
    @Column({ type: "int", default: 0 })
    price: number;

    @Column()
    id_category: number;

    @ManyToOne(() => Category, (category) => category.id_category)
    category: Category
}