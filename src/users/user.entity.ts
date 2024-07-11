import { Role } from 'src/role/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column("varchar", { length: 45 })
  username: string;

  @Column("varchar", { length: 45 })
  lastname: string;

  @Column("varchar", { length: 45 })
  email: string;

  @Column()
  password: string;

  @Column()
  rolesIdRol: number;

  @ManyToOne(() => Role, (rol) => rol.users)
  roles: Role
}
