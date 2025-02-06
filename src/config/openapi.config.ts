import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import * as packageJson from "../../package.json";

export const setupOpenAPI = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Capybara Hub")
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .addTag("Capybara Hub")
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
};
