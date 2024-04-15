import { Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { AuthenticationService } from "./authentication/authentication.service";
import { AuthenticationController } from "./authentication/authentication.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import { AuthenticationGuard } from "./authentication/authentication.guard";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { AuthorizationGuard } from "./authorization/authorization.guard";
@Module({
  imports:[
    ConfigModule.forFeature(jwtConfig),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers:[
    AuthenticationController,
  ],
  providers:[
    AuthenticationService,
    {
      provide:HashingService,
      useClass:BcryptService
    },
    {
      provide:'APP_GUARD',
      useClass:AuthenticationGuard
    },
    {
      provide:'APP_GUARD',
      useClass:AuthorizationGuard
    }
  ],
  exports:[HashingService]
})
export class IamModule {
}