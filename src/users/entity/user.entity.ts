import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../../common/enum/role.enum";
import { Course } from "../../courses/entity/course.entity";
import { Comment } from "../../comments/entity/comment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: Role;

  @ManyToMany((type) => Course, (course) => course.users)
  @JoinTable()
  courses: Course[];

  @OneToMany(type => Comment, (comment)=>comment.user)
  comments:Comment[]
}