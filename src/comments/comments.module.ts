import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entity/user.entity";
import { Course } from "../courses/entity/course.entity";
import { Comment } from "./entity/comment.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Course, Comment]),
  ],
  controllers:[CommentsController],
  providers:[CommentsService]
})
export class CommentsModule {
}