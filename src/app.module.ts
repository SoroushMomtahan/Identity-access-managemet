import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "./common/config/database.config";
import { UsersModule } from "./users/users.module";
import { IamModule } from "./iam/iam.module";
import { CoursesModule } from "./courses/courses.module";
import { CommentsModule } from "./comments/comments.module";
import { HttpUserModule } from "./http-user/http-user.module";

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
    IamModule,
    CoursesModule,
    CommentsModule,
    HttpUserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
