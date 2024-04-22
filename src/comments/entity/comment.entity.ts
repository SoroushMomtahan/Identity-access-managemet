import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../../courses/entity/course.entity";
import { User } from "../../users/entity/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  description:string;

  @Column({default:false})
  isAccepted:boolean

  @ManyToOne(type => Course, (course)=>course.comments)
  course:Course

  @ManyToOne(type => User, (user)=>user.comments)
  user:User

  @ManyToOne(type => Comment, (comment)=>comment.comment)
  comment:Comment
}