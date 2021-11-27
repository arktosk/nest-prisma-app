import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaClientHealthIndicator } from '../services/prisma';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private prismaClient: PrismaClientHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory-heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory-rss', 150 * 1024 * 1024),
      () => this.prismaClient.checkSQLite('sqlite'),
    ]);
  }
}
