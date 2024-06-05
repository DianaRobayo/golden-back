import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  product_name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  url_image: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  id_category: number;
}
