import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "../courses/entity/course.entity";
import { User } from "../users/entity/user.entity";
import { HttpUserService } from "./http-user.service";
import { HttpUserController } from "./http-user.controller";

@Module({
  imports:[
    TypeOrmModule.forFeature([Course, User]),
  ],
  providers:[
    HttpUserService,
  ],
  controllers:[
    HttpUserController
  ]
})
export class HttpUserModule {
}