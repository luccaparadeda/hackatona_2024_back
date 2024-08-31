import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Hackatona API")
    .setDescription("Hackatona API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.use(
    "/docs",
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
  await app.listen(8080);
}
bootstrap();
