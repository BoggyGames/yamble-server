import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://boggy.dev', 'https://www.boggy.dev', 'http://localhost:4200'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log("RUNNING ON http://localhost:" + port + " !")
}
bootstrap();
