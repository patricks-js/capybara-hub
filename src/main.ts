import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
// import * as fs from "node:fs";
import { AppModule } from "./app.module";
import { ErrorHandlerFilter } from "./middlewares/error-handler.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: "*",
  });
  app.useGlobalFilters(new ErrorHandlerFilter());

  const config = new DocumentBuilder()
    .setTitle("Capybara Hub")
    .setDescription("Capybara Hub Hotel System Management API")
    .setVersion("0.0.1")
    .addTag("CapybaraHub")
    .addBearerAuth({ type: "apiKey", name: "Authorization", in: "header" })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const document = documentFactory();
  SwaggerModule.setup("api/docs", app, documentFactory);

  // if (document) {
  //   fs.writeFileSync('./api-docs.json', JSON.stringify(document, null, 2));
  // } else {
  //   console.error('Swagger document is undefined');
  // }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
