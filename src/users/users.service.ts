import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id_user: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id_user });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async getUser(email): Promise<User> {
    const objUser = await this.usersRepository.findOneBy({
      email: email
    });
    return objUser;
  }
}