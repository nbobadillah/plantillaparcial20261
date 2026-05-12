import { Controller, Get, Query } from '@nestjs/common';
import { CpmQueryDto } from './dto/cpm-query.dto';
import { EngagementQueryDto } from './dto/engagement-query.dto';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('engagement')
  getEngagement(@Query() query: EngagementQueryDto) {
    return this.metricsService.getEngagement(query);
  }

  @Get('cpm')
  getCpm(@Query() query: CpmQueryDto) {
    return this.metricsService.getCpm(query);
  }
}
