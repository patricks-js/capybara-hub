import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";
import { ErrorHandlerFilter } from "./middlewares/error-handler.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useLogger(app.get(Logger));
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorHandlerFilter());

  const config = new DocumentBuilder()
    .setTitle("Capybara Hub")
    .setDescription("Capybara Hotel System Management API")
    .setVersion("0.1.0")
    .addTag("CapybaraHub")
    .addBearerAuth({ type: "apiKey", name: "Authorization", in: "header" })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    "/api/docs",
    apiReference({
      theme: "kepler",
      spec: { content: document },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
