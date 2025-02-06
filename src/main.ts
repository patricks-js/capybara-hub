import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./common/filters/global-exception.filter";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { setupOpenAPI } from "./config/openapi.config";
import { validationPipeConfig } from "./config/validation-pipe.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useLogger(app.get(Logger));
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(validationPipeConfig);
  app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter());

  setupOpenAPI(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
