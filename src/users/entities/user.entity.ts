import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../common/enum/role.enum";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  username:string;

  @Column()
  email:string;

  @Column()
  phoneNumber:string;

  @Column()
  password:string;

  @Column({default:Role.USER})
  role: Role
}