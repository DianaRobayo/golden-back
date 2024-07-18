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
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Role, Product, Category],
      // autoLoadEntities: true,
      synchronize: false, // en producción no se puede dejar en true porque se pierde datos  
    }),
    UsersModule,
    RoleModule,
    CategoryModule,
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'img'),
    }),
    AuthModule,
    // MulterModule.register({
    //   dest: './img',
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
