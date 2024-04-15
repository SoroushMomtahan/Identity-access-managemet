import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { HttpModule } from "@nestjs/axios";
import { IamModule } from "../iam/iam.module";

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    IamModule
  ],
  controllers:[UsersController],
  providers:[UsersService]
})
export class UsersModule {
}