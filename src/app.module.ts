import { Inject, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "./config/database.config";
import { UsersModule } from "./users/users.module";
import { IamModule } from "./iam/iam.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule.forFeature(databaseConfig)],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get('host'),
        port: configService.get('port'),
        type: 'mssql',
        username: 'sa',
        password: configService.get('password'),
        database: configService.get('database'),
        synchronize: true,
        autoLoadEntities: true,
        options: {
          encrypt: false
        }
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    IamModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
