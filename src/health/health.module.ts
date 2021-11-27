import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaClientHealthIndicator } from '../services/prisma';
import { PrismaClientModule } from '../services/prisma';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, PrismaClientModule],
  controllers: [HealthController],
  providers: [PrismaClientHealthIndicator],
})
export class HealthModule {}
