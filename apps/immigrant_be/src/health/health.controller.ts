import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { PrismaHealthIndicator } from './prisma-health.indicator';
import { RedisHealthIndicator } from './redis-health.indicator';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly redisHealth: RedisHealthIndicator,
  ) {}

  @Get()
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Health check (database and Redis connectivity)',
    description:
      'Returns 200 when every dependency answers and 503 with a per-service diagnosis when one does not. Use /health/live for container health checks.',
  })
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.prismaHealth.isHealthy('database'),
      () => this.redisHealth.isHealthy('redis'),
    ]);
  }

  @Get('ready')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Readiness check (database and Redis)' })
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.prismaHealth.isHealthy('database'),
      () => this.redisHealth.isHealthy('redis'),
    ]);
  }

  /**
   * Liveness only: answers as long as the process is up, on purpose. Pointing a
   * container health check at an endpoint that fails when Postgres blinks turns
   * a database outage into a restart loop.
   */
  @Get('live')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Liveness check (process only, no dependencies)',
  })
  @HealthCheck()
  liveness() {
    return this.health.check([]);
  }
}
