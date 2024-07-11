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

    @Column("varchar", { length: 45 })
    material: string;
  
    @Column("varchar", { length: 200 })
    url_image: string;
  
    @Column({ type: "int", default: 0 })
    price: number;

    @Column({ type: "boolean", default: 0 })
    privilege: boolean;

    @Column()
    categoriesIdCategory: number;        

    @ManyToOne(() => Category, (category) => category.products)
    categories: Category
}
