import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entity/user.entity";
import { Comment } from "../../comments/entity/comment.entity";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({default:false})
  isAccepted:boolean;

  @ManyToMany((type) => User, (user) => user.courses)
  @JoinTable()
  users: User[];

  @OneToMany(type => Comment, (comment)=>comment.course)
  comments:Comment[]
}