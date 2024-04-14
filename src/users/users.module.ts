import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { HttpModule } from "@nestjs/axios";
import { UsersExchange } from "./users.exchange";

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    HttpModule
  ],
  controllers:[UsersController],
  providers:[UsersService, UsersExchange]
})
export class UsersModule {
}