import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { PrismaClientService } from './prisma-client.service';

@Injectable()
export class PrismaClientHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaClient: PrismaClientService) {
    super();
  }

  async checkSQLite(key: string): Promise<HealthIndicatorResult> {
    try {
      const databaseTables = await this.prismaClient
        .$queryRaw`SELECT name FROM sqlite_schema WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%'`;
      return this.getStatus(key, true, {
        tables: (databaseTables as unknown[]).length,
        provider: (this.prismaClient as any)._activeProvider,
        client: {
          provider: 'prisma-client-js',
          version: (this.prismaClient as any)._clientVersion,
        },
      });
    } catch (error) {
      const status = this.getStatus(key, false, { error: error });
      throw new HealthCheckError('PrismaClient failed', status);
    }
  }
}
