import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Product } from './product/product.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'project_golden',
      entities: [User, Role, Product, Category],
      // autoLoadEntities: true,
      synchronize: false, // en producción no se puede dejar en true porque se pierde datos  
    }),
    UsersModule,
    RoleModule,
    CategoryModule,
    ProductModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
