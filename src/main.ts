import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientService } from './services/prisma/prisma-client.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaClient: PrismaClientService = app.get(PrismaClientService);
  prismaClient.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
