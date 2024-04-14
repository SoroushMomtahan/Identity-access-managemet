import { Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptService } from "./hashing/bcrypt.service";
import { HttpModule } from "@nestjs/axios";
import { AuthenticationService } from "./authentication/authentication.service";
import { AuthenticationController } from "./authentication/authentication.controller";
import { HashingController } from "./hashing/hashing.controller";
import { IamExchange } from "./iam.exchange";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
@Module({
  imports:[
    ConfigModule.forFeature(jwtConfig),
    HttpModule,
    JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers:[
    AuthenticationController,
    HashingController
  ],
  providers:[
    IamExchange,
    AuthenticationService,
    {
      provide:HashingService,
      useClass:BcryptService
    },
  ]
})
export class IamModule {
}