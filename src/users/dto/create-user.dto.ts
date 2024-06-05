import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;

  @ApiProperty()
  id_rol: number;
}


