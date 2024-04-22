import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as process from "process";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  await app.listen(process.env.APP_PORT, () => {
    console.log(`host > http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
  });
}

bootstrap();
