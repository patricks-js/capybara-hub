import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: "*",
  });

  const config = new DocumentBuilder()
  .setTitle("Capybara Hub")
  .setDescription("Capybara Hub Hotel System Management API")
  .setVersion("1.0")
  .addTag("CapybaraHub")
  .addBearerAuth({ type: "apiKey", name: "Authorization", in: "header" })
  .build();

  const documentFactory = ( ) => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
