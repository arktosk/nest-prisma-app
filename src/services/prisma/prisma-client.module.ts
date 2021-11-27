import { PrismaClient } from '.prisma/client';
import { Module } from '@nestjs/common';
import { PrismaClientHealthIndicator } from './prisma-client.health';
import { PrismaClientService } from './prisma-client.service';

@Module({
  providers: [
    PrismaClientService,
    { provide: PrismaClient, useClass: PrismaClientService },
    PrismaClientHealthIndicator,
  ],
  exports: [PrismaClientService, PrismaClientHealthIndicator],
})
export class PrismaClientModule {}
