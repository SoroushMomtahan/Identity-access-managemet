import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}