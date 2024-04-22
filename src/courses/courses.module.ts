import { Module } from "@nestjs/common";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entity/course.entity";
import { User } from "../users/entity/user.entity";
import { Comment } from "../comments/entity/comment.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Course, Comment])],
  controllers:[CoursesController],
  providers:[CoursesService]
})
export class CoursesModule {
}