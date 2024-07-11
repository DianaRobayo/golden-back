import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor"
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({
    type: "enum",  
    enum: UserRole,
  })
  rol: UserRole

  @OneToMany(() => User, (user) => user.roles)
  users: User[];

}
