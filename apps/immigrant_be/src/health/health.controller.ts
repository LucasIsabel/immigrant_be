import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { PrismaHealthIndicator } from './prisma-health.indicator';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get()
  @AllowAnonymous()
  @ApiOperation({ summary: 'Liveness check' })
  @HealthCheck()
  check() {
    return this.health.check([]);
  }

  @Get('ready')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Readiness check (database connectivity)' })
  @HealthCheck()
  readiness() {
    return this.health.check([() => this.prismaHealth.isHealthy('database')]);
  }
}
