import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./config/seeder/seeder.module";
import { SeederService } from "./config/seeder/seeder.service";

async function bootstrap() {
  const app = await NestFactory.create(SeederModule);
  const seedService = app.get(SeederService);

  try {
    await seedService.seed();
    console.log("Seeding complete");
  } catch (err) {
    console.error("Seeding error", err);
  } finally {
    await app.close();
  }
}

bootstrap();
