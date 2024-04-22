import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { HttpModule } from "@nestjs/axios";
import { IamModule } from "../iam/iam.module";
import { Course } from "../courses/entity/course.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Course]),
    IamModule
  ],
  controllers:[UsersController],
  providers:[UsersService]
})
export class UsersModule {
}